/**
 * Read in/write out the entire file at once - ok for small files
 */
const fs = require('fs');
fs.readFile('target.txt', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString());
});

