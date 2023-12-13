const http = require('http');

function createServers() {
    const port = 3001;

  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      // Handling a GET request to the root URL
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, World! (GET)');
    } else if (req.method === 'GET' && req.url === '/api/greet') {
      // Handling a GET request to the /api/greet endpoint
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Greetings from the server! (GET)' }));
    } else if (req.method === 'POST' && req.url === '/api/postdata') {
      let data = '';
      req.on('data', (data) => {
        data += data;
      });
    
      req.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Data received successfully (POST)', data: parsedData }));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid JSON format');
        }
      });
    } else if (req.method === 'OPTIONS' && req.url === '/api/options') {
      // Handling an OPTIONS request to the /api/options endpoint
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Options request handled successfully');
    } else {
      // Handling other paths or methods
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }).listen(port, () => {
    console.log(`http server is running on http://localhost:${port}`);
  });
  
  return { server };
}

createServers();

module.exports = createServers;
