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

  const query = `
    INSERT INTO phrases
      (kor, rom, eng, status, \`interval\`, repetitions, ef, dueDate)
    VALUES (?, ?, ?, "Not yet", 0, 0, 2.5, NOW())
  `;

  connection.query(query, [kor, rom, eng], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};





const updatePhrase = (id, data, callback) => {
  const { status, interval, repetitions, ef, dueDate } = data;

  const formattedDueDate = dueDate ? dueDate.replace('T', ' ').substring(0, 19) : null;

  const query = `
    UPDATE phrases
    SET status = ?, \`interval\` = ?, repetitions = ?, ef = ?, dueDate = ?
    WHERE id = ?
  `;

  connection.query(query, [status, interval, repetitions, ef, formattedDueDate, id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};




module.exports = {
  getAllPhrases,
  addPhrase,
  updatePhrase
};