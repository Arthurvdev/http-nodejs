import { createServer } from 'http';
import https from 'https';

createServer((req, res) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const api_key = 'C2KZNXSHOPILAEPYOVH6';
  const player_name = req.url.split('/')[2]; // obter o nome do jogador da URL da solicitação

  const urlPromises = []; // uma matriz de promessas de solicitação para cada página
  for (let i = 1; i <= 10; i++) { // itera sobre as 10 páginas
    const url = `https://api.brawlhalla.com/rankings/1v1/brz/${i}?api_key=${api_key}`;
    urlPromises.push(new Promise((resolve, reject) => {
      https.get(url, options, (apiRes) => {
        let data = '';

        apiRes.on('data', (chunk) => {
          data += chunk;
        });

        apiRes.on('end', () => {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        });
      }).on('error', (err) => {
        reject(err);
      });
    }));
  }

  Promise.all(urlPromises)
    .then((jsonArray) => {
      const allData = jsonArray.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
      const playerData = allData.filter(row => row.name.toLowerCase() === player_name.toLowerCase());

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.writeHead(200, {'Content-Type': 'application/json'});

      if (playerData.length > 0) {
        res.write(JSON.stringify(playerData));
      } else {
        res.write(JSON.stringify({error: 'Jogador não encontrado'}));
      }

      res.end();
    })
    .catch(error => {
      console.error(error);
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({error: 'Erro ao buscar dados do jogador'}));
      res.end();
    });
}).listen(process.env.PORT);
