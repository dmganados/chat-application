let http = require('http');
let formidable = require('formidable');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let oldpath = files.filetoupload.filepath;
            let newpath = 'C:\Users\DURREL\OneDrive - BYU-Idaho\Documents\Coding\Exam' + files.filetoupload.originalFilename;
            fs.rename(oldpath, newpath, (err) => {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });            
        });
    } else {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end()
    }
    
}).listen(3000);