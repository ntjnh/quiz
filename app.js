const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fetch = require("node-fetch");

app.get('/', (req, res) => res.send("Quiz"));

app.listen(port, () => console.log(`Server is running on port ${port}...`));