const fs = require('fs');
const readStream = fs.createReadStream('./mythirdfile.txt');

// Write to the console when the file is opened:
readStream.on('open', function () {
    console.log('The file is open');
});