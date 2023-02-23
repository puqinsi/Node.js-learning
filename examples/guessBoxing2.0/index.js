const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const game = require("./gameEngine");

let playerWinCount = 0;
http
  .createServer((req, res) => {
    const requestUrl = req.url;
    const { pathname, query } = url.parse(requestUrl);
    // 图标请求
    if (pathname === "/favicon.ico") {
      res.writeHead(200);
      res.end();
      return;
    }
    // 接口请求
    if (pathname === "/game") {
      const requestQuery = querystring.parse(query);
      let { code, msg } = game(requestQuery.action);
      let status;
      if (code !== -2) {
        if (code === 1) playerWinCount++;
        status = 200;
      } else {
        status = 400;
      }

      if (playerWinCount >= 3) {
        msg = "又输了，不和你玩了！";
        status = 500;
      }
      res.writeHead(status);
      res.end(msg);
    }
    // 页面请求
    if (pathname === "/") {
      res.writeHead(200);
      fs.createReadStream(`${__dirname}/index.html`).pipe(res);
    }
  })
  .listen(3000);
