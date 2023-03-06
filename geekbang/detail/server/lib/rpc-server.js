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
          // TODO 这样写太绕了，看看怎么简化
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
