var http = require("http");
var dt = require("./module");
var url = require("url");

http.createServer(function(req, res) {
    console.log(dt.date());
    var reqUrl = url.parse(req.url, true);
    var html = "";
    switch (reqUrl.pathname) {
        case "/":
            html = "<h1>index page</h1>";
            html += "<a href='/useradd.html'>User Add</a><br>";
            html += "<a href='/userlist.html'>User List</a>";
            break;
        case "/useradd.html":
            html = "<h1>User Add</h1>";
            html += "<form action='action.do'>";
            html += "Username <input type='text' name='uname'><br>";
            html += "UserEmail <input type='email' name='uemail'><br>";
            html += "<button onclick='go(this.form)'>Submit</button>";
            html += "</form>";
            html += "<script>";
            html += "function go(f) {";
            html += "alert('Username ::'+f.uname.value);";
            html += "f.submit()";
            html += "}";
            html += "</script>";
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Action not found' + reqUrl.pathname + '');
            break;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
}).listen(80);

console.log("Server is running...");