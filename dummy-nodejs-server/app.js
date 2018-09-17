// content of index.js
const http = require('http')
const port = process.env['DUMMY_PORT']

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end(`
    Hello! My name is ${process.env['DUMMY_NAME']}\n
    and I got a request to ${request.url}\n`)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
