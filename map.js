const uiInfo = require("./uiInfo.js");
module.exports.keys = {
    normal: {
        horizontal: "═",
        vertical: "║"
    },
    top: {
        left: "╔",
        right: "╗",
        cross: "╦"
    },
    body: {
        left: "╠",
        right: "╣",
        cross: "╬"
    },
    bottom: {
        left: "╚",
        right: "╝",
        cross: "╩"
    }
}
/**
 * Generates a map based on input given
 * @param width The width of the table
 * @param height The height of the table
 * @param player The position of where the player starts
 * @param widthSize The size of each point (defaults to 1)
 * @param points An array of points to display stuff at. The array will be as follows [[x,y,v]], with the v being the value at the point. Duplicate x,y's will be ignored
 * @return The table to display
 */
module.exports.genMap = function (width, height, player = {x: 1, y: 1}, widthSize = 1, points = []) {
    var max = 1;
    var json = {};
    // console.log(exits)
    points.push([player.x, player.y, "X"]);
    for (var i of points) {
        if (json.hasOwnProperty(i[1])) {
            if (!json[i[1]].hasOwnProperty(i[0])) {
                json[i[1]][i[0]] = i[2];
            }
        } else {
            json[i[1]] = {};
            json[i[1]][i[0]] = i[2];
        }
        if (i[2].length > max) {
            max = i[2].length;
        }
    }
    if (max > widthSize) {
        widthSize = max;
    }
    var str = "";
    var normal = this.keys.normal;
    var top = this.keys.top;
    var body = this.keys.body;
    var bottom = this.keys.bottom;
    for (var i = 1; i <= height * 2 + 1; i ++) {
        for (var j = 1; j <= width * 2 + 1; j ++) {
            if (i == 1) {
                if (j == 1) {
                    str += top.left;
                } else if (j % 2 == 0) {
                    str += normal.horizontal.repeat(widthSize);
                } else if (j == width * 2 + 1) {
                    str += top.right + "\n";
                } else {
                    str += top.cross;
                }
            } else if (i % 2 == 0) {
                if (j == 1) {
                    str += normal.vertical;
                } else if (j % 2 == 0) {
                    var x = i/2;
                    var y = j/2;
                    if (json.hasOwnProperty(x) && json[x].hasOwnProperty(y)) {
                        var pSize = widthSize - json[x][y].length;
                        if (json[x][y] == 'X') {
                            json[x][y] = uiInfo.foregroundColor(3) + "X" + uiInfo.colors.reset;
                        } else if (json[x][y] == 'E') {
                            json[x][y] = uiInfo.foregroundColor(28) + "E" + uiInfo.colors.reset;
                        } else if (json[x][y] == '$') {
                            json[x][y] = uiInfo.foregroundColor(220) + "$" + uiInfo.colors.reset;
                        }
                        str += " ".repeat(Math.floor(pSize/2)) + json[x][y] + " ".repeat(Math.ceil(pSize/2));
                    } else {
                        str += " ".repeat(widthSize);
                    }
                } else if (j == width * 2 + 1) {
                    str += normal.vertical + "\n";
                } else {
                    str += normal.vertical;
                }
            } else if (i == height * 2 + 1) {
                if (j == 1) {
                    str += bottom.left;
                } else if (j % 2 == 0) {
                    str += normal.horizontal.repeat(widthSize);
                } else if (j == width * 2 + 1) {
                    str += bottom.right + "\n";
                } else {
                    str += bottom.cross;
                }
            } else {
                if (j == 1) {
                    str += body.left;
                } else if (j % 2 == 0) {
                    str += normal.horizontal.repeat(widthSize);
                } else if (j == width * 2 + 1) {
                    str += body.right + "\n";
                } else {
                    str += body.cross;
                }
            }
        }
    }
    return str;
}

module.exports.openFileHandler = function(fileHandlerData) {
    var points = [];
    for (var i of Object.keys(fileHandlerData.points)) {
        for (var j of Object.keys(fileHandlerData.points[i])) {
            points.push([i,j,fileHandlerData.points[i][j]])
        }
    }
    for (var i of Object.keys(fileHandlerData.exits)) {
        for (var j of Object.keys(fileHandlerData.exits[i])) {
            points.push([i,j,"E"]);
        }
    }
    for (var i of Object.keys(fileHandlerData.coins)) {
        for (var j of Object.keys(fileHandlerData.coins[i])) {
            points.push([i,j,"$"]);
        }
    }
    return this.genMap(fileHandlerData.width, fileHandlerData.height, fileHandlerData.player, fileHandlerData.widthSize, points)
}