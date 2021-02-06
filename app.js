var http = require('http');
var requestHandler = require('./requestHandler');

http.createServer((request, response) => {
    requestHandler.write(request, response);
}).listen(4444);;

console.log("Server running at http://127.0.0.1:4444/");