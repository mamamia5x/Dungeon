if (process.argv.length >= 3 && process.argv[2] == "dev") {
    require("./dev/liveEdit.js");
}
const prompt = require("./prompt.js")();
const fs = require("fs");
const mapper = require("./map.js");
const fileHandler = require("./fileHandler.js");
const playerManager = require("./player.js");
const uiInfo = require("./uiInfo.js");

var player = playerManager.player;
var main = fs.readFileSync(playerManager.defaults.directory + "/" + playerManager.defaults.manager).toString();
var mainName = main.split("\n")[0].trim();
fileHandler.addLevel(playerManager.defaults.directory + "/" + mainName + ".lvl", mainName);
var current = fileHandler.levels[mainName];
var temp = `
You can 
(w) Move Up
(a) Move Left
(s) Move Down
(d) Move Right
(e) Exit
`
var done = false;
while (!done) {
    var map = mapper.openFileHandler(current);
    console.clear();
    if (playerManager.defaults.dev) {
        console.log(current)
        console.log(current.player.x, current.player.y)
    }
    displayStats();
    console.log(map)
    console.log(temp);
    var w = current.width;
    var h = current.height;
    var x = current.player.x;
    var y = current.player.y;
    var input = prompt(" > ").trim().toLowerCase();
    if (input == "e") break;
    else if (input == "dev") playerManager.defaults.dev = !playerManager.defaults.dev;
    else if (input == 'w') y --;
    else if (input == 's') y ++;
    else if (input == 'a') x --;
    else if (input == 'd') x ++;
    if (x > w) x = w;
    else if (x < 1) x = 1;
    if (y > h) y = h;
    else if (y < 1) y = 1;
    var nextMove = current.get(x,y);
    var exited = current.checkExit(x,y);
    var money = current.checkCoin(x,y);
    if (exited != '') {
        current = {};
        fileHandler.addLevel(playerManager.defaults.directory + "/" + exited + ".lvl",exited);
        current = fileHandler.levels[exited];
    } else if (money != '') {
      var range = money.split(":");
      if (range.length == 1) {
          player.coins += range[0] * 1;
      } else {
          player.coins += random(range[0] * 1, range[1] * 1) * 1;
      }
      delete current.coins[x][y];
      if (Object.keys(current.coins[x]).length == 0) {
          delete current.coins[x];
      }
      current.player.x = x;
      current.player.y = y;
    } else if (nextMove == '') {
        current.player.x = x;
        current.player.y = y;
    }
}

function displayStats() {
    var percent = Math.round(uiInfo.settings.statSize * player.health.value / player.health.max);
    console.log(textColor(49) + "Health [" + textColor(115)+ "=".repeat(percent) + "-".repeat(uiInfo.settings.statSize - percent) + textColor(49) + "] " + player.health.value + "/" + player.health.max + uiInfo.colors.reset);
    console.log(textColor(184) + "Coins: $(" + textColor(11) + player.coins + textColor(184) + ")" + uiInfo.colors.reset);
    console.log();
    console.log("Currently on Floor " + current.name.replace(/\D+/g, ""));
}

function textColor(color) {
    return uiInfo.foregroundColor(color);
}

function backgroundColor(color) {
    return uiInfo.backgroundColor(color);
}

function random(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}