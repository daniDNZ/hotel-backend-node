// Remove all data from all tables

import connection from "./mysqlConnection";

const removeAllData = (): void => {
  connection.query('DELETE FROM photos', function (error, results, fields) {
    if (error) throw error
  });
  connection.query('DELETE FROM users', function (error, results, fields) {
    if (error) throw error
  });
  connection.query('DELETE FROM bookings', function (error, results, fields) {
    if (error) throw error
  });
  connection.query('DELETE FROM rooms', function (error, results, fields) {
    if (error) throw error
  });
  connection.query('DELETE FROM messages', function (error, results, fields) {
    if (error) throw error
  });
  connection.query('DELETE FROM bookings_rooms', function (error, results, fields) {
    if (error) throw error
  });
  connection.query('DELETE FROM rooms_photos', function (error, results, fields) {
    if (error) throw error
  });
}

const resetAutoIncrements = (): void => {
  connection.query('ALTER TABLE photos AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error) throw error;
  });
  connection.query('ALTER TABLE users AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error) throw error;
  });
  connection.query('ALTER TABLE bookings AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error) throw error;
  });
  connection.query('ALTER TABLE rooms AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error) throw error;
  });
  connection.query('ALTER TABLE messages AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error) throw error;
  });
  connection.query('ALTER TABLE bookings_rooms AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error) throw error;
  });
  connection.query('ALTER TABLE rooms_photos AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error) throw error;
  });
}

removeAllData();
resetAutoIncrements();

export { removeAllData, resetAutoIncrements };