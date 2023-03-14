const cluster = require("cluster");
const parentProcess = require("./master");
const childProcess = require("./child");

if (cluster.isMaster) {
  parentProcess(cluster.fork);

  cluster.on("exit", () => {
    console.log("parent: exit");
  });
} else {
  childProcess();
}
