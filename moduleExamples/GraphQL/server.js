const Koa = require("koa");
const { graphqlHTTP } = require("koa-graphql");
const schema = require("./schema");

const app = new Koa();

app.use(
  graphqlHTTP({
    schema
  })
);

app.listen(4000);
