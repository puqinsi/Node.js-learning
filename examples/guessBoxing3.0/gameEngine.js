/* 剪刀石头布 */
module.exports = function (playerAction) {
  const list = ["石头", "剪刀", "布"];
  if (list.indexOf(playerAction) === -1) {
    return { code: -2, msg: `输入错误！请输入: ${list.join(" | ")}` };
  }

  const computerAction = getComputerAction();
  console.log(`你：${playerAction}; 机器人：${computerAction}`);

  if (playerAction === computerAction) {
    return { code: 0, msg: "平局" };
  } else if (
    (playerAction === "石头" && computerAction === "剪刀") ||
    (playerAction === "剪刀" && computerAction === "布") ||
    (playerAction === "布" && computerAction === "石头")
  ) {
    return { code: 1, msg: "你赢了" };
  } else {
    return { code: -1, msg: "你输了" };
  }
};

function getComputerAction() {
  const random = Math.random() * 3;
  let computerAction;
  if (random < 1) {
    computerAction = "石头";
  } else if (random < 2) {
    computerAction = "剪刀";
  } else {
    computerAction = "布";
  }

  return computerAction;
}
