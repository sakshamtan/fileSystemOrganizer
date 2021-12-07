
function helpFn()
{
    console.log(`List of all commands -> 
    Tree command - node FO.js tree <dirName>
    organize command - node FO.js organize <dirName>
    help command - node FO.js help`);

    // back ticks (``) to display multiple lines in a single console.log
}

module.exports = {
    helpKey : helpFn
};