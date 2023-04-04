/*
 * 封装 RPC 服务
 * 接收三个参数作为具体业务接口
 */
const net = require("net");

module.exports = class RPC {
  constructor({ encodeResponse, decodeRequest, isCompleteRequest }) {
    this.decodeRequest = decodeRequest;
    this.encodeResponse = encodeResponse;
    this.isCompleteRequest = isCompleteRequest;
  }

  createServer(callback) {
    let buffer = null;
    const tcpServer = net.createServer(socket => {
      socket.on("data", data => {
        buffer =
          buffer && buffer.length > 0 ? Buffer.concat([buffer, data]) : data;

        let checkLength = null;
        while (buffer && (checkLength = this.isCompleteRequest(buffer))) {
          let requestBuffer = null;

          if (buffer.length === checkLength) {
            requestBuffer = buffer;
            buffer = null;
          } else {
            requestBuffer = buffer.slice(0, checkLength);
            buffer = buffer.slice(checkLength);
          }

          const { result, seq } = this.decodeRequest(requestBuffer);

          // 第一个参数：请求数据；第二个参数：响应函数
          /* 为什么把请求的处理写的这么绕？ */
          // 目的是：1. 把请求数据的 Buffer 处理 和 响应数据的 Buffer 处理统一封装；2. 把响应数据的获取和返回格式暴露出去（从而业务可以灵活使用）
          // 其实觉得绕是因为处于上帝视角（两边代码逻辑都有看到），如果封装好的方法，本身的使用（只关注一边的代码）是很简单的。
          // 很好的一个封装思路，巧妙的把定制部分暴露出去
          callback({ body: result, socket }, data => {
            const buffer = this.encodeResponse(data, seq);
            socket.write(buffer);
          });
        }
      });
    });

    return {
      listen() {
        tcpServer.listen.apply(tcpServer, arguments);
      }
    };
  }
};
