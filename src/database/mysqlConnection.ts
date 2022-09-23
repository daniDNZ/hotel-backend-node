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

export function dbQuery(query: string, params?: Array<any>): Promise<Array<any>> {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error)
        reject(error);
      resolve(results);
    });
  });
}
export default connection;