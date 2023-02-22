const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const game = require("./gameEngine");

http
  .createServer((req, res) => {
    const requestUrl = req.url;
    const { pathname, query } = url.parse(requestUrl);
    if (pathname === "/favicon.ico") {
      res.writeHead(200);
      res.end();
      return;
    }
    if (pathname === "/game") {
      const requestQuery = querystring.parse(query);
      const { code, msg } = game(requestQuery.action);
      if (code !== -2) {
        res.writeHead(200);
      } else {
        res.writeHead(0);
      }

      res.end(msg);
    }
    if (pathname === "/") {
      res.writeHead(200);
      fs.createReadStream(`${__dirname}/index.html`).pipe(res);
    }
  })
  .listen(3000);
