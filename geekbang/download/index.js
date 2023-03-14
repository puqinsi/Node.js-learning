const fs = require("fs");
const koa = require("koa");
const mount = require("koa-mount");
const static = require("koa-static");

const app = new koa();

app.use(static(__dirname + "/source"));

const body = fs.readFileSync(__dirname + "/source/index.html", "utf-8");
app.use(
  mount("/", async ctx => {
    ctx.body = body;
  })
);

app.listen(3000);
