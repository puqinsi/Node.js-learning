module.exports = function () {
  //  当进程出现会崩溃的错误
  process.on("uncaughtException", function (err) {
    // 这里可以做写日志的操作
    console.log(`uncaughtException: ${err}`);
    // 退出进程
    process.exit(1);
  });

  // 回应心跳信息
  process.on("message", msg => {
    // console.log(`child: ${msg}`);
    if (msg === `ping#${process.pid}`) {
      process.send(`pong#${process.pid}`);
    }
  });

  // 内存监控：内存使用过多(700 M)，自己退出进程
  if (process.memoryUsage().rss > 734003200) {
    console.log(`内存使用过多`);
    process.exit(1);
  }

  require("./app");
};
