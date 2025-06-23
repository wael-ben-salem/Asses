const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database-mysql');
const { getAllPhrases ,updatePhrase ,addPhrase} = require('../database-mysql');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// UNCOMMENT TO START
 app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/phrases', (req, res) => {
  getAllPhrases((err, results) => {
    if (err) {
      res.status(400).send('Erreur serveur');
    } else {
      res.json(results);
    }
  });
});



app.post('/api/phrases', (req, res) => {
  const newPhrase = req.body;

  if (!newPhrase.kor || !newPhrase.rom || !newPhrase.eng) {
    return res.status(400).send('Champs manquants');
  }

  addPhrase(newPhrase, (err, results) => {
    if (err) {
      res.status(500).send('Erreur serveur lors de l\'ajout');
    } else {
      res.status(200).json({ message: 'Phrase ajoutée avec succès', id: results.insertId });
    }
  });
});

app.patch('/api/phrases/:phraseId', (req, res) => {
  const phraseId = req.params.phraseId;
  const { status, interval, repetitions, ef, dueDate } = req.body;

  if (!status) {
    return res.status(400).send('Status is required');
  }

  updatePhrase(phraseId, { status, interval, repetitions, ef, dueDate }, (err, results) => {
    if (err) {
      res.status(500).send('Erreur serveur lors de la mise à jour');
    } else {
      res.status(200).send('Phrase mise à jour');
    }
  });
});

//TODO - add additional route handlers as necessary

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});