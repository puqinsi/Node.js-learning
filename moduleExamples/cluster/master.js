const os = require("os");

module.exports = cluster => {
  for (let i = 0; i < os.cpus().length / 2; i++) {
    createWorker(cluster.fork);
  }

  // 监听子进程挂掉，5s 后重启服务
  cluster.on("exit", () => {
    console.log("process exit");
    setTimeout(() => {
      createWorker(cluster.fork);
    }, 5000);
  });
};

function createWorker(createProcess) {
  const worker = createProcess();
  const pid = worker.process.pid;

  // 心跳
  let missed = 0;
  let timer = setInterval(function () {
    // 三次没回应，杀掉进程
    if (missed == 3) {
      clearInterval(timer);
      console.log(pid + " has become a zombie!");
      process.kill(pid);
      return;
    }

    missed++;
    // 发送心跳信息
    worker.send(`ping#${pid}`);
  }, 1000);

  worker.on("message", msg => {
    // console.log(`parent: ${msg}`);
    if (msg == "pong#" + pid) {
      missed--;
    }
  });

  worker.on("exit", () => {
    clearInterval(timer);
    console.log(`exit: ${pid}`);
  });
}
