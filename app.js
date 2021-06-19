// Classes
var Main = require("./classes/main");
Main = new Main();

// Modules
const express = require("express");
const app = express();
const path = require("path");

// Express configuration
app.use('/', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes

// Default Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages/index.html"));
});

// API - ToDo List
app.get("/api/list", (req, res) => {
    res.status(200).json(Main.List);
});

// API - ToDo Remove from List
app.delete("/api/remove", (req, res) => {
    if(!req.body.index) return res.status(500).json({error: "No 'index' parameter found!"});
    let { index } = req.body;
    Main.remove(index, () => {
        res.status(200).json(Main.List);
    });
});

// API - ToDo Add to List
app.post("/api/add", (req, res) => {
    if(!req.body.text) return res.status(500).json({error: "No 'text' parameter found!"});
    let { text } = req.body;
    Main.add(text, () => {
        res.status(200).json(Main.List);
    });
});





app.listen(80, () => { console.log(`Server listening to port :80!`) });