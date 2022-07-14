var http = require("http");
var fs = require("fs");
var url = require("url");
var user = require("./user");

http.createServer(function(req, res) {
    var reqUrl = url.parse(req.url, true);
    var html = '';
    if (reqUrl.pathname.endsWith('.do')) {
        switch (reqUrl.pathname) {
            case '/useradd.do':
                user.add(req, res);
                break;
            case '/userlist.do':
                user.list(req, res);
                break;
            default:
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("Action not found:" + reqUrl.pathname);
                break;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else {
        var filename = '.' + reqUrl.pathname;
        if (filename == './') filename = "./index.html";
        fs.readFile(filename, function(err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end("file not found:" + reqUrl.pathname);
            }
            var ctype = 'text/html';
            if (reqUrl.pathname.startsWith("/js/")) {
                ctype = 'text/javascript';
            }
            if (reqUrl.pathname.startsWith("/css/")) {
                ctype = 'text/css';
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
    }
}).listen(80);
console.log("Server is running...");