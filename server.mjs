fetch('https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6')
  .then(response => response.json())
  .then(data => {
    document.body.innerHTML = JSON.stringify(data);
  })
  .catch(error => console.error(error));
