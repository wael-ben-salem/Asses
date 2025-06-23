const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllPhrases = function(callback) {
  const query = 'SELECT * FROM phrases';
  connection.query(query, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const addPhrase = (newPhrase, callback) => {
  const { kor, rom, eng } = newPhrase;
  const query = 'INSERT INTO phrases (kor, rom, eng, status) VALUES (?, ?, ?, "Not yet")';
  connection.query(query, [kor, rom, eng], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const updatePhrase = (id, status, callback) => {
  const query = 'UPDATE phrases SET status = ? WHERE id = ?';
  connection.query(query, [status, id], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};



module.exports = {
  getAllPhrases,
  addPhrase,
  updatePhrase
};