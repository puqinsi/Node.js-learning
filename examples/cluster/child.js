module.exports = function () {
  //  当进程出现会崩溃的错误
  process.on("uncaughtException", function (err) {
    // 这里可以做写日志的操作
    console.log(err);
    // 退出进程
    process.exit(1);
  });

  process.on("message", msg => {
    console.log(`child: ${msg}`);
    process.send(`ping#${process.pid}`);
  });

  // 内存使用过多，自己退出进程
  if (process.memoryUsage().rss > 734003200) {
    process.exit(1);
  }

  require("./app");
};
