const fs = require("fs");
const protoBuf = require("protocol-buffers");
const commentData = require("./mockdata/comment");

const { CommentListRequest, CommentListResponse } = protoBuf(
  fs.readFileSync(`${__dirname}/../play/schema/comment.proto`)
);

const server = require("./lib/geeknode-rpc-server")(
  CommentListRequest,
  CommentListResponse
);

server
  .createServer((request, response) => {
    response({ comments: commentData });
  })
  .listen(4001, () => {
    console.log("rpc server listened: 4001");
  });
