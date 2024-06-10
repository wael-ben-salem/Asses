const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database-mysql');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/phrases', (req, res) => {
  db.getAllPhrases((err, phrases) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(phrases);
  });
});

app.patch('/api/phrases/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  db.updatePhrase(id, status, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
