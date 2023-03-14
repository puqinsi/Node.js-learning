const os = require("os");

module.exports = createProcess => {
  for (let i = 0; i < os.cpus().length / 2; i++) {
    createWorker(createProcess);
  }
};

function createWorker(createProcess) {
  const worker = createProcess();
  const pid = worker.process.pid;
  worker.send("ping#" + pid);

  worker.on("message", msg => {
    console.log(`parent: ${msg}`);
  });

  worker.on("exit", () => {
    console.log(`exit: ${pid}`);
  });
}
