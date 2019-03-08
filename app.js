const http = require("http");
const hostname = "localhost";
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Server works");
});

server.listen(port, hostname, () => console.log(`Server is running at http://${hostname}:${port}...`));