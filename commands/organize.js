const fs = require('fs');
const path = require('path');

function organizeFn(dirPath)
{
    //1.input of a directory path
    let destPath;

    if(dirPath == undefined)
    {
        console.log('Please enter a directory path');
        return;
    }
    else
    {
        let doesExist = fs.existsSync(dirPath);
        //console.log(doesExist); // It returns true or false for the directory
        if(doesExist)
        {
            //2.Create an Organized files directory (Is organized_files folder mei hi saari files organize krenge).
            destPath = path.join(dirPath,"organized_files");

            if(fs.existsSync(destPath) == false)
            {
                fs.mkdirSync(destPath); //we will only create a diretory if it doesnt exists previously
            }
            else
            {
                console.log('The folder already exists');
            }
        }
        else
        {
            console.log('Please enter a valid path');
        }
    }
    organizeHelper(dirPath,destPath); // dirPath -> testFolder , destPath -> organized_files
}

//This function categorizes the files
function organizeHelper(src, dest)
{
    let childNames = fs.readdirSync(src); // array of files present in the test folder
    // console.log(childNames);

    for(let i = 0; i < childNames.length; i++)
    {
        let childAddress = path.join(src,childNames[i]);  // har file ka path bna rhe hai.
        let isFile = fs.lstatSync(childAddress).isFile(); // sirf files ko organize krenge

        if(isFile)
        {
            let fileCategory = getCategory(childNames[i]);
            console.log(childNames[i] + "  belongs to  " + fileCategory);

            sendFiles(childAddress,dest,fileCategory);
        }
    }
}

function getCategory(name)
{
    let ext = path.extname(name);
    // console.log(ext);
    ext = ext.slice(1);  // to remove '.' from extension names
    // console.log(ext);

    for(let type in types)
    {
        let cTypeArr = types[type];
        // console.log(cTypeArr);

        for(let i = 0; i < cTypeArr.length; i++)
        {
            if(ext == cTypeArr[i]) // matched the ext name with the category name in the types object
            {
                return type;
            }
        }
    }
    return "others"; // if category not found in the object for a specific file then that file will go into 'others' folder
}

function sendFiles(srcFilePath, dest, fileCategory)
{
    let catPath = path.join(dest, fileCategory);

    if(fs.existsSync(catPath) == false)
    {
        fs.mkdirSync(catPath); // Creating folders of various categories like app, documents etc.
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(catPath, fileName); // will copy the file inside catPath folder

    fs.copyFileSync(srcFilePath, destFilePath); // file copied into it's respective category folder
    fs.unlinkSync(srcFilePath); // deleting the copy of file present in testFolder

    console.log(fileName + " copied to " + fileCategory);
}

module.exports = {
    organizeKey : organizeFn
};
