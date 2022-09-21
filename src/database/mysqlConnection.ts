import mysql from 'mysql';
import config from '../env';

const connection = mysql.createConnection({
  host: config.HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return console.error('ERROR: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

connection.end();

export default connection;