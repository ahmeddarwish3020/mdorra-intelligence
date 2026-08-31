const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
});
server.listen(3004, '0.0.0.0', () => console.log('Test server on 3004'));