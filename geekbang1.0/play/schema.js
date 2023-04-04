const { buildSchema } = require("graphql");
const fs = require("fs");
const commentClient = require("./client/comment");
const praiseClient = require("./client/praise");

const schema = buildSchema(
  fs.readFileSync(__dirname + "/schema/comment.gql", "utf-8")
);

schema.getQueryType().getFields().comment.resolve = () => {
  return new Promise((resolve, reject) => {
    commentClient.write(
      {
        columnId: 0
      },
      (err, res) => {
        err ? reject(err) : resolve(res.comments);
      }
    );
  });
};

schema.getMutationType().getFields().praise.resolve = (_, { id }) => {
  return new Promise((resolve, reject) => {
    praiseClient.write(
      {
        commentId: id
      },
      (err, res) => {
        err ? reject(err) : resolve(res.praiseNum);
      }
    );
  });
};

module.exports = schema;
