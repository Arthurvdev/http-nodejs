import https from 'https';
import http from 'http';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const url = 'https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6';

const server = http.createServer((req, res) => {
  https.request(url, options, apiRes => {
    let data = '';
    apiRes.on('data', chunk => {
      data += chunk;
    });
    apiRes.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }).end();
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
