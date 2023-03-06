const columnData = require("./mockdata/column");
const { columnRequest, columnResponse } = require("../common/schema");

const server = require("./lib/geeknode-rpc-server")(
  columnRequest,
  columnResponse
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
