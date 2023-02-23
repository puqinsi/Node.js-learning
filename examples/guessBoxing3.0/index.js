const fs = require("fs");
const express = require("express");
const game = require("./gameEngine");

let playerWinCount = 0;
const app = express();

app.get("/favicon.ico", (req, res) => {
  res.status(200);
});

app.get(
  "/game",
  (req, res, next) => {
    if (playerWinCount >= 3) {
      res.status(500);
      res.send("不和你玩了！");
      return;
    }

    // 中间件
    next();

    if (res.playerWon) playerWinCount++;
  },
  (req, res) => {
    const query = req.query;
    let { code, msg } = game(query.action);
    let status;
    if (code === -2) {
      status = 400;
    } else {
      res.playerWon = code === 1;
      status = 200;
    }

    res.status(status);
    res.send(msg);
  }
);

app.get("/", (req, res) => {
  res.status(200);
  res.send(fs.readFileSync(`${__dirname}/index.html`, "utf-8"));
});

app.listen(3000);
