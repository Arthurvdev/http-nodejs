import http from 'http';
import https from 'https';

const PORT = process.env.PORT || 3000;

const requestHandler = (req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const url = 'https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6';
  
  https.request(url, options, apiResponse => {
    let data = '';
  
    apiResponse.on('data', chunk => {
      data += chunk;
    });
  
    apiResponse.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(data);
      res.end();
    });
  }).end();
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
