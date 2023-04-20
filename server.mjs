<script type="module">
  import https from 'https';

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const url = 'https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6';

  https.request(url, options, res => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      document.getElementById('data').innerHTML = JSON.stringify(JSON.parse(data));
    });
  }).end();
</script>

<div id="data"></div>
