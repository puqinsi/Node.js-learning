const fs = require("fs");
const game = require("./gameEngine");
const koa = require("koa");
const mount = require("koa-mount");

let playerWinCount = 0;
const app = new koa();

app.use(
  mount("/favicon.ico", ctx => {
    ctx.status = 200;
  })
);

const gameKoa = new koa();
app.use(mount("/game", gameKoa));

// 中间件
gameKoa.use(async (ctx, next) => {
  if (playerWinCount >= 3) {
    ctx.status = 500;
    ctx.body = "不和你玩了！";
    return;
  }

  // 中间件
  await next();

  if (ctx.playerWon) playerWinCount++;
});

// 中间件
gameKoa.use(async ctx => {
  const query = ctx.request.query;
  await new Promise(resolve => {
    setTimeout(() => {
      let { code, msg } = game(query.action);
      let status;
      if (code === -2) {
        status = 400;
      } else {
        ctx.playerWon = code === 1;
        status = 200;
      }

      ctx.status = status;
      ctx.body = msg;
      resolve();
    }, 500);
  });
});

// 注意顺序，如果放在 "/game" 路由上面，此路由会执行。
app.use(
  mount("/", ctx => {
    ctx.status = 200;
    ctx.body = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
  })
);

app.listen(3000);
