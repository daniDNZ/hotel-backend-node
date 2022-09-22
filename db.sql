CREATE DATABASE mirandadb;
USE mirandadb;


CREATE TABLE photos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(255)
);

CREATE TABLE users(
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  job VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  startDate DATE,
  functions DATE,
  state ENUM('active', 'inactive'),
  password VARCHAR(255),
  photoId INT,
  CONSTRAINT fk_user_photo
  FOREIGN KEY (photoId)
    REFERENCES photos(id)
      ON UPDATE CASCADE
      ON DELETE SET NULL
);

CREATE TABLE rooms(
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255),
  number VARCHAR(255),
  price DECIMAL(6,2),
  amenities JSON,
  description VARCHAR(511),
  offer BOOLEAN DEFAULT 0,
  discount TINYINT,
  cancellation VARCHAR(511)
);

CREATE TABLE bookings(
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255),
  checkIn DATE,
  checkOut DATE,
  orderDate DATE,
  specialRequest VARCHAR(511),
  status ENUM('inprogress', 'checkout', 'checkin'),
  price DECIMAL(7,2)
);

CREATE TABLE bookings_rooms(
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomId INT NOT NULL,
  bookingId INT NOT NULL,
  CONSTRAINT fk_br_room
    FOREIGN KEY (roomId)
      REFERENCES rooms(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
  CONSTRAINT fk_br_booking
    FOREIGN KEY (bookingId)
      REFERENCES bookings(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE rooms_photos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  roomId INT NOT NULL,
  photoId INT NOT NULL,
  CONSTRAINT fk_up_room
    FOREIGN KEY (roomId)
      REFERENCES rooms(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
  CONSTRAINT fk_up_photo
    FOREIGN KEY (photoId)
      REFERENCES photos(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE messages(
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE,
  customer VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  subject VARCHAR(255),
  comment VARCHAR(511),
  status ENUM('active', 'archived')
);

