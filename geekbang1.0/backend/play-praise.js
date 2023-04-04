const fs = require("fs");
const protoBuf = require("protocol-buffers");
const commentData = require("./mockdata/comment");

const { PraiseRequest, PraiseResponse } = protoBuf(
  fs.readFileSync(`${__dirname}/../play/schema/comment.proto`)
);

const server = require("./lib/geeknode-rpc-server")(
  PraiseRequest,
  PraiseResponse
);

server
  .createServer((request, response) => {
    const commentId = request.body.commentId;
    const comment = commentData.filter(comment => comment.id === commentId)[0];
    let praiseNum = 0;
    if (comment) {
      comment.praiseNum++;
      praiseNum = comment.praiseNum;
    }

    // 直接返回假数据
    response({
      commentId,
      praiseNum
    });
  })
  .listen(4002, () => {
    console.log("rpc server listen: 4002");
  });
