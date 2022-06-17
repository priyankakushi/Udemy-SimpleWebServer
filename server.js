const http = require("http");
let url = require("url");
let path = require("path");
let fs = require("fs");
const { unescape } = require("querystring");


let mineTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
}


http.createServer(function (req, res) {

    let uri = url.parse(req.url).pathname
    let fileName = path.join(process.cwd(), unescape(uri))
    console.log("Loading", uri)
    let stats;


    try {
        stats = fs.lstatSync(fileName)
    }
    catch (e) {
        res.writeHead(404, { "Contant-type": "text/plain" })
        res.write("404 Not Found\n")
        res.end()
        return
    }
    if (stats.isFile()) {
        let mineType = mineTypes[path.extname(fileName).split(".").reverse()[0]]
        res.writeHead(200, { "Contant-type": mineType })

        let fileStream = fs.createReadStream(fileName)
        fileStream.pipe(res)
    }
    else if (stats.isDirectory()) {
        res.writeHead(302, { "Location": "index.html" }
        )
        res.end()
    }
     else {
        res.writeHead(500, { "Content-Type": "text/plain" })
        res.write('500 Internal Error\n')
        res.end()
    }
}).listen(1337)



















// const hostname = "127.0.0.1";
// const port = 1337

// http.createServer(function(req, res) {

//     res.writeHead(200, {"Content-Type": "text/Plain"});
//     res.end("hello world\n");
// }).listen(port, hostname, function() {
//     console.log(`Server running at http://${hostname}:${port}/`)
// })