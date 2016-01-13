var fs = require('fs');
module.exports = {

    readJsonFile: function(path, callback) {
        fs.readFile(path, 'utf8', function(err, data) {
            if (err) console.log(err);
            callback(JSON.parse(data));
        });
    },

    writeJsonFile: function(path, data, callback) {
        var finalData = JSON.stringify(data);
        fs.writeFile(path, finalData, function(err) {
            if (err) console.log("Error writing file = " + err);
            callback("Successfully written ");
        });
    }
};
