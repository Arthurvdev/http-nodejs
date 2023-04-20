const https = require('https');

const options = {
  method: 'GET',
  hostname: 'api.brawlhalla.com',
  path: '/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6',
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
