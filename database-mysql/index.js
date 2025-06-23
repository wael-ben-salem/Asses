const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllPhrases = function(categoryId, callback) {
  let query = `
    SELECT phrases.*, categories.name as categoryName
    FROM phrases
    LEFT JOIN categories ON phrases.category_id = categories.id
  `;

  let params = [];
  if (categoryId) {
    query += ' WHERE category_id = ?';
    params.push(categoryId);
  }

  query += ' ORDER BY dueDate ASC';

  connection.query(query, params, (err, results) => {
    if (err) callback(err);
    else callback(null, results);
  });
};


const addPhrase = (newPhrase, callback) => {
  const { kor, rom, eng, category_id } = newPhrase;

  const query = `
    INSERT INTO phrases
      (kor, rom, eng, status, \`interval\`, repetitions, ef, dueDate, category_id)
    VALUES (?, ?, ?, "Not yet", 0, 0, 2.5, NOW(), ?)
  `;

  connection.query(query, [kor, rom, eng, category_id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};






const updatePhrase = (id, data, callback) => {
  const { status, interval, repetitions, ef, dueDate, category_id } = data;

  const formattedDueDate = dueDate ? dueDate.replace('T', ' ').substring(0, 19) : null;

  let query = `
    UPDATE phrases
    SET status = ?, \`interval\` = ?, repetitions = ?, ef = ?, dueDate = ?
  `;

  const params = [status, interval, repetitions, ef, formattedDueDate];

  if (category_id !== undefined) {
    query += ', category_id = ?';
    params.push(category_id);
  }

  query += ' WHERE id = ?';
  params.push(id);

  connection.query(query, params, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};


const getAllCategories = (callback) => {
  const query = 'SELECT * FROM categories ORDER BY name';
  connection.query(query, (err, results) => {
    if (err) callback(err);
    else callback(null, results);
  });
};

const addCategory = (name, callback) => {
  const query = 'INSERT INTO categories (name) VALUES (?)';
  connection.query(query, [name], (err, results) => {
    if (err) callback(err);
    else callback(null, results);
  });
};


module.exports = {
  getAllPhrases,
  addPhrase,
  updatePhrase,
  getAllCategories,
  addCategory
};