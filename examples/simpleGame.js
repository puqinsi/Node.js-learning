/* 剪刀石头布 */
const { argv } = process;
const playerAction = argv[argv.length - 1];

const random = Math.random() * 3;
let computerAction;
if (random < 1) {
  computerAction = "石头";
} else if (random < 2) {
  computerAction = "剪刀";
} else {
  computerAction = "布";
}

function computeResult(playerAction, computerAction) {
  if (playerAction === computerAction) {
    return "平局";
  } else if (
    (playerAction === "石头" && computerAction === "剪刀") ||
    (playerAction === "剪刀" && computerAction === "布") ||
    (playerAction === "布" && computerAction === "石头")
  ) {
    return "你赢了";
  } else {
    return "你输了";
  }
}

const result = computeResult(playerAction, computerAction);
console.log(`你：${playerAction}; 电脑：${computerAction}`);
console.log(result);
