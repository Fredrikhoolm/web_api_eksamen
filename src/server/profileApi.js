const express = require("express");
const profileApi = express.Router();

const books = [
    {
        id: 1,
        title: "Uncle Tom's Cabin",
        author: "Harriet Stowe",
        year: "1852",
    },
    {
        id: 2,
        title: "Hakkebakkeskogen",
        author: "Thorbjørn Egner",
        year: "1953",
    },
];

profileApi.get("", (req, res) => {
    console.log(books);
    res.json(books);
});

profileApi.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
    res.json(book);
});

profileApi.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);
    const { title, author, year } = req.body;
    books[bookIndex] = { title, author, year, id };
    res.status(200).end();
});

profileApi.post("", (req, res) => {
    const { title, author, year } = req.body;
    console.log(req.body);
    books.push({ title, author, year, id: books.length + 1 });
    res.status(201).end();
});

module.exports = profileApi;