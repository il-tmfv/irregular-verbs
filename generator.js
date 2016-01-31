var fs = require('fs')
var util = require('util')
var endOfLine = require('os').EOL;

fs.readFile('source.txt', 'utf8', handleRead);

function handleRead(err, data) {
    if (err) throw new Error("Error reading file");
    
    var res = "data = [" + endOfLine;
    var id = 0
    
    var formFullText = function (elem) {
        return elem[0] + " - " + elem[1] + " - " + elem[2];
    };
    
    data.split('\n').forEach(function (item, i, arr) {
        if (item.length != 0) {
            item = item.trim();
            var elem = item.split('\t');
            res += util.format("{id: %d, text: \"%s\", form1: \"%s\", form2: \"%s\", form3: \"%s\", ru: \"%s\"},%s", id++, formFullText(elem), elem[0], elem[1], elem[2], elem[3], endOfLine);
        }
    });
    
    res += "];";
    
    fs.writeFile("dict.js", res, function(err) {
        if (err) throw new Error("Error writing file");
        console.log("Done!");
    });
}