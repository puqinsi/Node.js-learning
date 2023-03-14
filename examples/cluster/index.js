const cluster = require("cluster");
const parentProcess = require("./master");
const childProcess = require("./child");

if (cluster.isMaster) {
  parentProcess(cluster);
} else {
  childProcess();
}
