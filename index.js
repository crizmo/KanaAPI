const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

let kanaData;

// Enable CORS
app.use(cors());

// Load Kana data from JSON file
const loadKanaData = () => {
  const kanaFilePath = path.resolve(__dirname, 'data/kana.json');
  const fileContent = fs.readFileSync(kanaFilePath, 'utf-8');
  kanaData = JSON.parse(fileContent);
};

// Serve the documentation page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs.html'));
});

// Endpoint to get Kana data by character
app.get('/api/kana/:character?', (req, res) => {
  const character = req.params.character;
  if (character) {
    const data = kanaData.find(item => item.character === character);
    if (!data) {
      return res.status(404).json({ error: `No Kana data found for ${character}` });
    }
    return res.json(data);
  } else {
    return res.json(kanaData);
  }
});

// Endpoint to get Kana data by type (hiragana or katakana)
app.get('/api/:type', (req, res) => {
  const type = req.params.type;
  if (type !== 'hiragana' && type !== 'katakana') {
    return res.status(400).json({ error: 'Invalid type. Must be "hiragana" or "katakana".' });
  }
  const data = kanaData.filter(item => item.type === type);
  res.json(data);
});

// Endpoint to get Kana chart by type (hiragana or katakana)
app.get('/api/chart/:type', (req, res) => {
  const type = req.params.type;
  if (type !== 'hiragana' && type !== 'katakana') {
    return res.status(400).json({ error: 'Invalid type. Must be "hiragana" or "katakana".' });
  }
  const kanaChart = kanaData.filter(item => item.type === type);

  const chart = {
    a: [],
    i: [],
    u: [],
    e: [],
    o: []
  };

  kanaChart.forEach(item => {
    const romaji = item.romaji;
    const vowel = romaji[romaji.length - 1];
    if (chart[vowel]) {
      chart[vowel].push(item);
    }
  });

  res.json(chart);
});

// Load Kana data and start the server
loadKanaData();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});