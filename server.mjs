import https from 'https';
import { createServer } from 'http';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const url = 'https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6';

createServer((req, res) => {
  https.request(url, options, response => {
    response.on('data', chunk => {
      res.write(chunk);
    });
    response.on('end', () => {
      res.end();
    });
  }).end();
}).listen(process.env.PORT);
