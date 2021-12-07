const fs = require("fs");
const path = require("path");

function treeFn(targetPath)
{
    if(targetPath == undefined)
    {
        console.log("Please Enter a Path");
        return;
    }
    else
    {
        let doesExist = fs.existsSync(targetPath);
        if(doesExist)
        {
            treeHelper(targetPath," ");
        }
        else
        {
            console.log("Please Enter a Valid Path");
            return;
        }
    }
}

function treeHelper(targetPath,indent)  // indent is just for spacing (empty string)
{
    let isFile = fs.lstatSync(targetPath).isFile();

    if(isFile)
    {
        let fileName = path.basename(targetPath);
        console.log(indent + "├──" + fileName);
    }
    else 
    {
        let dirName = path.basename(targetPath);
        console.log(indent + "└──" + dirName);

        let children = fs.readdirSync(targetPath);

        for(let i = 0; i < children.length; i++)
        {
            let childPath = path.join(targetPath,children[i]);
            treeHelper(childPath,indent + "\t");  // recursive call
        }
    }
}

module.exports = {
    treeKey : treeFn
};