const http = require("http");
const fs = require("fs");

http
  .createServer((request, response) => {
    if (request.url === "/favicon.ico") {
      response.writeHead(200);
      response.end();
      return;
    }

    response.writeHead(200);
    fs.createReadStream(__dirname + "/index.html").pipe(response);
  })
  .listen(3000, () => {
    console.log("listen at 3000");
  });
