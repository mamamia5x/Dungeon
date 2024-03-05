module.exports.settings = {
    statSize: 20,
}
module.exports.colors = {
    reset: "\u001b[0m",
    foreground: "\u001b[38;5;",
    background: "\u001b[48;5;",
    black: 0,
    red: 1,
    green: 2,
    yellow: 3,
    blue: 4,
    purple: 5,
    cyan: 6,
    gray: 7,
    darkGray: 8,
    brightRed: 9,
    limeGreen: 10,
    brightYellow: 11,
    brightBlue: 12,
    brightPurple: 13,
    brightCyan: 14,
    white: 15

}
module.exports.foregroundColor = function (color) {
    return this.colors.foreground + color + "m";
}
module.exports.backgroundColor = function (color) {
    return this.colors.background + color + "m";
}

module.exports.rgb = {
    foreground: function (r,g,b) {
        return "\u001b[38;2;" + r + ";" + g + ";" + b + "m";
    },
    background: function (r,g,b) {
        return "\u001b[48;2;" + r + ";" + g + ";" + b + "m";
    }
}

module.exports.reset = function () {
    console.log(this.colors.reset);
}