const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllPhrases = function() { 
  // TODO - your code here!
};

module.exports = {
  getAllPhrases
};