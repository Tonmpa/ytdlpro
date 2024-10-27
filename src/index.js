const express = require('express');
const path = require('path');
const { downloadSongFromUrl, isValidUrl, getDownloadedSongs, getUserDownloadPath } = require('./libs');

const app = express();
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/downloads', express.static(getUserDownloadPath()));

app.get('/songs', async (req, res) => {
  const songs = await getDownloadedSongs();
  res.send(songs || []);
});

app.post('/download', (req, res) => {
  if (!req.body || !req.body.url) {
    return res.status(400).send('URL is required');
  }
  const url = req.body.url;
  if (!isValidUrl(url)) {
    return res.status(400).send('Invalid URL');
  }
  downloadSongFromUrl(req.body.url)
  .then((songPath) => {
    res.send({ songPath });
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});