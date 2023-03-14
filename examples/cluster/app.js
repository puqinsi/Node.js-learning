const http = require("http");

module.exports = http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });

    res.end("hello world");
  })
  .listen(3000, () => {
    console.log("listen at http://localhost:3000");
  });
