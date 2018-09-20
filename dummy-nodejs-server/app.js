// content of index.js
const http = require('http')
const fs = require('fs')
const path = require('path')
const port = process.env['DUMMY_PORT']
const www_dir = process.env['WWW_DIR']

const simpleRequestHandler = (request, response) => {
  console.log(request.url)
  response.end(`
    Hello! My name is ${process.env['DUMMY_NAME']}
    and I got a request to ${request.url}`)
}

const fileServer = (request, response) => {
  const { url } = request;
  console.log(url)
  fs.readFile(
    path.join(www_dir, url[url.length - 1] === '/' ? url + "/index.html" : url),
    {encoding: "utf8"},
    (e, data) => {
      if(e) {
        if(e.code === "ENOENT") {
          response.statusCode = 404;
          response.end("404 not found");
          return;
        }
        console.error(e.code)
        response.statusCode = 500;
        response.end("Internal server error")
        return;
      }
      response.end(data)
    })
}

const server = http.createServer(www_dir ? fileServer : simpleRequestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
