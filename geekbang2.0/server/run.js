const mount = require("koa-mount");
const requestFactory = require("./request-factory");
const createTemplate = require("./create-template");

requestFactory.registerProtocol("geek-rpc", require("./requestors/geek-rpc"));
requestFactory.registerProtocol("http", require("./requestors/http"));

module.exports = function (app) {
  const koa = new (require("koa"))();

  koa.use(async (ctx, next) => {
    if (ctx.url == "/favicon.ico") {
      return;
    }
    await next();
  });

  // 遍历所有服务
  Object.keys(app).forEach(routePath => {
    const { data, template } = app[routePath];
    // 获取每个服务的配置
    const dataConfig = eval(data);
    // 遍历每个配置中的请求
    const requests = Object.keys(dataConfig).reduce((ret, key) => {
      ret[key] = requestFactory(dataConfig[key]);
      return ret;
    }, {});
    const templateFn = createTemplate(template);
    //
    koa.use(
      mount(routePath, async ctx => {
        ctx.status = 200;
        const result = {};
        await Promise.all(
          Object.keys(requests).map(key => {
            return requests[key](ctx.query).then(res => {
              result[key] = res.result;
              return res.result;
            });
          })
        );

        try {
          ctx.body = templateFn(result);
        } catch (e) {
          ctx.status = 500;
          ctx.body = e.stack;
        }
      })
    );
  });

  koa.listen(3000);
};
