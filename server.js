const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/'));

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/webpage.html'));
});

app.get('/about', (req, res) => {
  res.sentFile(path.join(__dirname + '/about.html'));
});

app.get('/donate', (req, res) => {
  res.sendFile(path.join(__dirname + '/donate.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname + '/game.html'));
});

let port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

