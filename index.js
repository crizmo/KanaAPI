const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

let kanaData;

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
app.get('/api/kana/:character', (req, res) => {
  const character = req.params.character;
  const data = kanaData.find(item => item.character === character);
  if (!data) {
    return res.status(404).json({ error: `No Kana data found for ${character}` });
  }
  res.json(data);
});

// Endpoint to get Hiragana chart
app.get('/api/hiragana', (req, res) => {
  const hiraganaChart = kanaData.filter(item => item.type === 'hiragana');

  const chart = {
    a: [],
    i: [],
    u: [],
    e: [],
    o: []
  };

  hiraganaChart.forEach(item => {
    const romaji = item.romaji;
    const vowel = romaji[romaji.length - 1];
    if (chart[vowel] && !chart[vowel].includes(item.character)) {
      chart[vowel].push(item.character);
    }
  });

  res.json(chart);
});

// Endpoint to get Katakana chart
app.get('/api/katakana', (req, res) => {
  const katakanaChart = kanaData.filter(item => item.type === 'katakana');

  const chart = {
    a: [],
    i: [],
    u: [],
    e: [],
    o: []
  };

  katakanaChart.forEach(item => {
    const romaji = item.romaji;
    const vowel = romaji[romaji.length - 1];
    if (chart[vowel] && !chart[vowel].includes(item.character)) {
      chart[vowel].push(item.character);
    }
  });

  res.json(chart);
});
// Load Kana data and start the server
loadKanaData();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});