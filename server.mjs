import { createServer } from 'http';

createServer((req, res) => {
  res.write(https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6);
  res.end();
}).listen(process.env.PORT);
