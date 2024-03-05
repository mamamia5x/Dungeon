const prompt = require("prompt-sync")();
const fs = require("fs");
const mapper = require("./map.js");
const fileHandler = require("./fileHandler.js");
const playerManager = require("./player.js");
const uiInfo = require("./uiInfo.js");
var colors = uiInfo.colors;

var player = playerManager.player;
var main = fs.readFileSync("levels/main.mgr").toString();
var mainName = main.split("\n")[0].trim();
fileHandler.addLevel("levels/" + mainName + ".lvl", mainName);
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
var dev = false;
while (!done) {
    var map = mapper.openFileHandler(current);
    console.clear();
    if (dev) {
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
    var input = prompt(" >").trim().toLowerCase();
    if (input == "e") break;
    else if (input == "dev") dev = !dev;
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
    if (exited != '') {
        current = {};
        fileHandler.addLevel("levels/" + exited + ".lvl",exited);
        current = fileHandler.levels[exited];
    }
    else if (nextMove == '') {
        current.player.x = x;
        current.player.y = y;
    }
}

function displayStats() {
    var percent = Math.round(uiInfo.settings.statSize * player.health.value / player.health.max);
    console.log(uiInfo.foregroundColor(49) + "Health [" + uiInfo.foregroundColor(115)+ "=".repeat(percent) + "-".repeat(uiInfo.settings.statSize - percent) + uiInfo.foregroundColor(49) + "] " + player.health.value + "/" + player.health.max);
    uiInfo.reset();
    console.log("Currently on Floor " + current.name.replace(/\D+/g, ""));
}