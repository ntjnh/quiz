const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname + "/public/index.html")));

app.get('/index-jsx/', (req, res) => res.sendFile(path.resolve(__dirname + '/public/js/index.js')));

app.listen(port, () => console.log(`Server is running at http://localhost:${port}...`));