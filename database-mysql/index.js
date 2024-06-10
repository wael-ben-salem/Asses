const mysql = require("mysql");
const mysqlConfig = require("./config.js");

const connection = mysql.createConnection(mysqlConfig);

const getAllPhrases = function (callback) {
  const queryPhrases = "SELECT * FROM phrases";
  connection.query(queryPhrases, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

const updatePhrase = function (phraseId, newStatus, callback) {
  const queryPhrases = "UPDATE phrases SET status = ? WHERE id = ?";
  connection.query(queryPhrases, [newStatus, phraseId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

const addPhrase = async (kor, eng, rom, status,) => {
  const query =
    "INSERT INTO phrases (kor, eng, rom, status) VALUES (?, ?, ?, ?)";
  connection.query(query, [kor, eng, rom, status], (err, results) => {
    if (err) {
      return err;
    }
    return  results;
  });
};

module.exports = {
  getAllPhrases,
  updatePhrase,
  addPhrase,
};
