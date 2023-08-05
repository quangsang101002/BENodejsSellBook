import connection from './connection.database.js';

connection.query('SELECT * FROM users LIMIT 3', (error, results) => {
  if (error) {
    console.log('Error: ', error);
    throw error;
  }
  console.log(results);
});
