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

module.exports = {
  getAllPhrases
};