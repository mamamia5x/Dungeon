const fs = require("fs");
const fileHandler = require("../fileHandler.js");
const mapper = require("../map.js");
const player = require("../player.js");
const prompt = require("../prompt.js")();

console.clear();
console.log("Running development editor. . .");
console.log(`________                                .___      
\\______ \\   _______  _______   ____   __| _/____  
 |    |  \\_/ __ \\  \\/ /     \\ /  _ \\ / __ |/ __ \\ 
 |    \`   \\  ___/\\   /  Y Y  (  <_> ) /_/ \\  ___/ 
/_______  /\\___  >\\_/|__|_|  /\\____/\\____ |\\___  >
        \\/     \\/          \\/            \\/    \\/ 
`)
console.log("Hello user! Welcome to devmode.");
console.log("Here, you can edit your level files live, and test them.")
console.log("You can create new dev files.");
console.log("You can set the default file, and that's about it for now.");
console.log("Thanks for stopping by :)");
getInput();
function fileEdit() {
    var fileName = prompt("Edit what file? ");
    console.log("Ok, opening dev/" + fileName + ".lvl");
    try {
        fileDisplay(fileName);
        fs.watchFile("dev/" + fileName + ".lvl", {interval: 100}, (x) => {
            fileDisplay(fileName);
        });
    } catch (e) {
        console.log("An error occurred opening dev/" + fileName + ".lvl");
        getInput();
    }
}

function fileDisplay(fileName) {
    try {
        console.log("=".repeat(20) + fileName + ".lvl" + "=".repeat(20));
        var file = fs.readFileSync("dev/" + fileName + ".lvl").toString();
        var list = file.split("\n");
        console.log(file);
        fileHandler.addLevel("dev/" + fileName + ".lvl");
        console.log(mapper.openFileHandler(fileHandler.levels[fileName]));
        console.log("=".repeat(20) + fileName + ".lvl" + "=".repeat(20));
        if (list[list.length - 1].trim() == "# Exit") {
            fs.unwatchFile("dev/" + fileName + ".lvl");
            getInput();
        }
    } catch (e) {
        console.log("Error " + e.message)
        fs.unwatchFile("dev/" + fileName + ".lvl");
        getInput();
    }
}

function runTest() {
    player.defaults.manager = "dev.mgr";
    player.defaults.directory = "dev";
    player.defaults.dev = true;
    require("../index.js");
}

function getInput() {
    console.log(`\nYou can
    1) Show all files
    2) Live Edit a file
    3) Create a new file
    4) Delete an existing file
    5) Set default dev file
    6) Run the mgr file
    7) Exit`);
    var input = prompt(" > ");
    if (input == 1) {
        var count = 1;
        fs.readdirSync("dev/").forEach(x => {
            var ending = x.split(".")[1];
            if (ending == "lvl" || ending == "mgr") {
                console.log("  - " + count + ". " + x);
                count ++;
            }
        });
        getInput();
    } else if (input == 2) {
        console.log("You are now live editing a file");
        console.log("Everytime you save, the results of the level will be displayed");
        console.log("If the last line is \"# Exit\", the program will exit the editor");
        fileEdit();
    } else if (input == 3) {
        console.log("Note, you can only add .lvl files, and cannot be in a directory");
        console.log("  And, if the file exists, it'll just write a blank file over it.")
        console.log("Enter the name of the new file: ");
        var v = prompt(" > ").trim();
        if (v.split(".").length > 1 && v.split(".")[1] == "lvl") {
            try {
                fs.writeFileSync("dev/" + v, "");
                console.log("File successfully added at dev/" + v);
            } catch (e) {
                console.log("Couldn't add file");
            }
        } else {
            console.log("File isn't the proper type");
        }
        getInput();
    } else if (input == 4) {
        console.log("Note, you can only delete .lvl files, and it cannot be in a directory");
        console.log("What file would you like to remove?");
        var v = prompt(" > ").trim();
        if (v.split(".").length > 1 && v.split(".")[1] == "lvl") {
            try {
                fs.unlinkSync("dev/" + v);
                console.log("File successfully removed at dev/" + v);
            } catch (e) {
                console.log("Couldn't remove file");
            }
        } else {
            console.log("File isn't the proper type");
        }
        getInput();
    } else if (input == 5) {
        console.log("Note, you can only use the name of the lvl file");
        console.log("What should be the default file?");
        var v = prompt(" > ").trim();
        fs.writeFileSync("dev/dev.mgr", v);
        console.log("dev/" + v + ".lvl is now the default level.");
        getInput();
    } else if (input == 6) {
        console.log("You are now going to run the program!");
        console.log("You can type \"dev\" to turn off dev logging.");
        prompt("Press enter to continue");
        runTest();
    } else if (input == 7) {

    } else {
        getInput();
    }
}