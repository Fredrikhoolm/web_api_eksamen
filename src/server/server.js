const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.use(cors());


const profileApi = [{

        id: 1,
        firstName: "Fredrik",
        lastName: "Holm",
},
    {
        id: 2,
        firstName: "Håvard",
        lastName: "Nes",
    }

];

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/profilePage", (req, res) => {
    console.log(profileApi);
    res.json(profileApi);
})

app.post("/api/profilePage", (req, res) => {
    const {firstName, lastName, year} = req.body;
    console.log(req.body);
    profileApi.push({firstName, lastName, year, id: profileApi.length + 1})
    res.status(201);
    res.end();
});

app.use((req, res, next) => {
    if (req.method !== "GET") {
        return next();
    }
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
});

const wsServer = require("./websocket");
app.use("/api", require("./apiRouter"));

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        return res.sendFile(
            path.resolve(__dirname, "..", "..", "dist", "index.html")
        );
    }
    return next();
});

const server = app.listen(3000, () => {
    server.on("upgrade", (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, (socket) => {
            wsServer.emit("connection", socket, req);
        });
    });
});



