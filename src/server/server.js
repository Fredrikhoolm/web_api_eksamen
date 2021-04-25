const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();

app.use(cors());


const profile = [{

        id: 1,
        firstName: "Uncle Tom's Cabin",
        lastName: "Harriet Stowe",
        year: "1852"
},
    {
        id: 2,
        firstName: "Hakkebakkeskogen",
        lastname: "Thorbjørn Egner",
        year: "1953"
    }

];

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.get("/api/profilePage", (req, res) => {
    console.log(profile);
    res.json(profile);
})

app.post("/api/profilePage", (req, res) => {
    const {firstName, lastName, year} = req.body;
    console.log(req.body);
    profile.push({firstName, lastName, year, id: profile.length+1})
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

const server = app.listen(1234, () => {
    server.on("upgrade", (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, (socket) => {
            // This will pass control to `wsServer.on("connection")`
            wsServer.emit("connection", socket, req);
        });
    });
});



