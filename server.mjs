import http from 'http';
import fetch from 'node-fetch';

const API_KEY = 'C2KZNXSHOPILAEPYOVH6';

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const response = await fetch(`https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=${API_KEY}`);
      const data = await response.json();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(data));
      res.end();
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write('Internal Server Error');
      res.end();
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
    res.end();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
