const Koa = require("koa");
const mount = require("koa-mount");
const static = require("koa-static");
const clientRPC = require("./client");
const template = require("./template");

const detailTemplate = template(__dirname + "/template/index.html");

const app = new Koa();

app.use(mount("/static", static(`${__dirname}/source/static/`)));

app.use(
  mount("/", async ctx => {
    const columnId = ctx.query.columnId;
    if (!columnId) {
      ctx.status = 400;
      ctx.body = "invalid columnId";
      return;
    }

    const result = await new Promise((resolve, reject) => {
      clientRPC.write({ columnId }, (err, data) => {
        err ? reject(err) : resolve(data);
      });
    });

    ctx.status = 200;
    ctx.body = detailTemplate(result);
  })
);

app.listen(3000);
