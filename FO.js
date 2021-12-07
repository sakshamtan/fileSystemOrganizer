// First Activity with node.js

// We will be creating a File System Organizer
// Features of the project - 
// If you have numerous Files in a folder and they are not Properly arranged 
// You can use this tool to arrange them in specific directory according to their extension
// Like text files will go into text folder .exe files will go into applications folder and so on
// so at the end you will have an arranged set of files in specific folders

// we will be using built in node modules like fs and path to create this project

// array ke form mei input jaata hai command line pe

// let input = process.argv[2];
// console.log(input);
// node js treats command line inputs as array and that array is your process array

const fs = require('fs');
const path = require('path');
const organizeObj = require('./commands/organize');
const helpObj = require('./commands/help');
const treeObj = require('./commands/tree');
const { treeKey } = require('./commands/tree');

let inputArr = process.argv.slice(2); // slice is used to extract the commands and path we have passed 
// console.log(inputArr);

let command = inputArr[0]; // organize, help, tree, default

let types = {
    media: ["mp4", "mkv","mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex','csv'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    pictures : ['jpeg','mpg','img','jpg','gif','png']
};

switch(command)
{
    case 'tree' : treeObj.treeKey(inputArr[1]);
    break;
    case 'organize' : organizeObj.organizeKey(inputArr[1]);
    break;
    case 'help' : helpObj.helpKey();
    break;
    default : console.log("PLEASE ENTER A VALID COMMAND");
    break;
}