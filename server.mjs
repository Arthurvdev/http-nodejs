import fetch from 'node-fetch';
import express from 'express';

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://api.brawlhalla.com/rankings/1v1/brz/1?api_key=C2KZNXSHOPILAEPYOVH6');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
