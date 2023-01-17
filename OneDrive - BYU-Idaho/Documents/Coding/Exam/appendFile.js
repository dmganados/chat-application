const fs = require('fs');

// The fs.appendFile() method appends specified content to a file. If the file does not exist, the file will be created:
// fs.appendFile('mynewfile.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// The fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created:
// fs.open('mysecondfile.txt', 'w', function(err, file) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// The fs.writeFile() method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created:
// fs.writeFile('mythirdfile.txt', 'Hello content', function(err) {
//     if (err) throw err;
//     console.log('Saved!');
// });

// Upload Files
// The fs.appendFile() method appends the specified content at the end of the specified file:
// fs.appendFile('mynewfile.txt', ' This is my text.', function (err) {
//     if (err) throw err;
//     console.log('Updated!');
// });

// The fs.writeFile() method replaces the specified file and content:
// fs.writeFile('mythirdfile.txt', 'This is my text', function (err) {
//     if (err) throw err;
//     console.log('Replaced!');
//   });

// Delete Files
// To delete a file with the File System module,  use the fs.unlink() method.
// The fs.unlink() method deletes the specified file:
// fs.unlink('mysecondfile.txt', function(err) {
//     if (err) throw err;
//     console.log('File deleted!');
// });

// Rename Files
// To rename a file with the File System module,  use the fs.rename() method.
// The fs.rename() method renames the specified file:
// fs.rename('mynewfile.txt', 'myrenamedfile.txt', function(err) {
//     if (err) throw err;
//     console.log('File renamed!');
// });

// The Built-in URL Mode
// The URL module splits up a web address into readable parts.
// To include the URL module, use the require() method:
const url = require('url');

// Parse an address with the url.parse() method, and it will return a URL object with each part of the address as properties:

const adr = 'http://localhost:8080/default.htm?year=2017&month=february';
const q = url.parse(adr, true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

const qdata = q.query;
console.log(qdata.month);




