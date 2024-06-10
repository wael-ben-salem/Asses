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

module.exports = {
  getAllPhrases,
};
