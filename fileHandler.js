const fs = require("fs");

module.exports.levels = {}
module.exports.keys = {
    'X': "player",
    'E': "exit",
    '$': "coins"
}
module.exports.addLevel = function (filename, name=null) {
    if (name == null) {
        name = filename.split(/[/\\]/g);
        name = name[name.length - 1].split(".")[0];
    }
    var json = {
        name: name,
        width: -1,
        height: -1,
        widthSize: 3,
        player: {x: 1, y: 1},
        exits: {},
        coins: {},
        points: {},
        get: function(x, y) {
            if (this.points.hasOwnProperty(x) && this.points[x].hasOwnProperty(y)) {
                return this.points[x][y];
            }
            return "";
        },
        checkExit: function (x, y) {
            if (this.exits.hasOwnProperty(x) && this.exits[x].hasOwnProperty(y)) {
                return this.exits[x][y];
            }
            return "";
        },
        checkCoin: function (x, y) {
            if (this.coins.hasOwnProperty(x) && this.coins[x].hasOwnProperty(y)) {
                return this.coins[x][y];
            }
            return "";
        }
    };
    var level = fs.readFileSync(filename).toString().split("\n");
    var line = 1;
    for (var i of level) {
        i = i.trim();
        if (i.charAt(0) == '#' || i == "") {
            continue;
        }
        if (line == 1) {
            json.width = i;
        } else if (line == 2) {
            json.height = i;
        } else if (line == 3) {
            json.widthSize = i;
        } else {
            i = i .split(",");
            i[2] = i[2].replaceAll(/["']/g, "").trim();
            if (i[2].charAt(0) == 'E' && i[2].charAt(1) == '-' && i[2].charAt(2) == ">") {
                if (!json.exits.hasOwnProperty(i[0])) {
                    json.exits[i[0]] = {};
                }
                json.exits[i[0]][i[1]] = i[2].split(">")[1];
            }
            else if (i[2] == 'E') {}
            else if (i[2].charAt(0) == "$" && i[2].charAt(1) == '-' && i[2].charAt(2) == ">") {
                if (!json.coins.hasOwnProperty(i[0])) {
                    json.coins[i[0]] = {};
                }
                json.coins[i[0]][i[1]] = i[2].split(">")[1];
            }
            else if (this.keys.hasOwnProperty(i[2]) && this.keys[i[2]] == "player") {
                json.player.x = i[0];
                json.player.y = i[1];
            } else {
                if(!json.points.hasOwnProperty(i[0])) {
                    json.points[i[0]] = {};
                }
                json.points[i[0]][i[1]] = i[2];
            }
        }
        line ++;
    }
    this.levels[name] = json;
}