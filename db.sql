CREATE DATABASE mirandadb;
USE mirandadb;

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  photo VARCHAR(255),
  fullName VARCHAR(255),
  job VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  startDate VARCHAR(255),
  functions VARCHAR(255),
  state ENUM('active', 'inactive'),
  password VARCHAR(255)
);

CREATE TABLE rooms(
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255),
  number VARCHAR(255),
  price DECIMAL(6,2),
  amenities JSON,
  photos JSON,
  description VARCHAR(511),
  offer BOOLEAN,
  discount DECIMAL(3,0),
  cancellation VARCHAR(511)
);

CREATE TABLE bookings(
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255),
  checkIn VARCHAR(255),
  checkOut VARCHAR(255),
  orderDate VARCHAR(255),
  specialRequest VARCHAR(511),
  status ENUM('inprogress', 'checkout', 'checkin'),
  price DECIMAL(7,2),
  room INT,
  CONSTRAINT fk_room
  FOREIGN KEY (room)
    REFERENCES rooms(id)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE messages(
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(255),
  customer VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  subject VARCHAR(255),
  comment VARCHAR(511),
  status ENUM('active', 'archived')
);

