const columnData = require("./mockdata/column");
const protoBuf = require("protocol-buffers");
const fs = require("fs");

const schemas = protoBuf(fs.readFileSync("../common/detail.proto"));
const { ColumnRequest, ColumnResponse } = schemas;

const server = require("./lib/geeknode-rpc-server")(
  ColumnRequest,
  ColumnResponse
);

server
  .createServer((request, response) => {
    // 实际开发需要借助此 ID，请求数据库数据
    const columnID = request.body;

    // 直接返回假数据
    response({
      column: columnData[0],
      recommendColumns: [columnData[1], columnData[2]]
    });
  })
  .listen(4000, () => {
    console.log("rpc server listen: 4000");
  });
