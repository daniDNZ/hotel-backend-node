"use strict";
// Remove all data from all tables
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAutoIncrements = exports.removeAllData = void 0;
const mysqlConnection_1 = __importDefault(require("./mysqlConnection"));
const removeAllData = () => {
    mysqlConnection_1.default.query('DELETE FROM photos', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('DELETE FROM users', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('DELETE FROM bookings', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('DELETE FROM rooms', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('DELETE FROM messages', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('DELETE FROM bookings_rooms', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('DELETE FROM rooms_photos', function (error, results, fields) {
        if (error)
            throw error;
    });
};
exports.removeAllData = removeAllData;
const resetAutoIncrements = () => {
    mysqlConnection_1.default.query('ALTER TABLE photos AUTO_INCREMENT = 1', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('ALTER TABLE users AUTO_INCREMENT = 1', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('ALTER TABLE bookings AUTO_INCREMENT = 1', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('ALTER TABLE rooms AUTO_INCREMENT = 1', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('ALTER TABLE messages AUTO_INCREMENT = 1', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('ALTER TABLE bookings_rooms AUTO_INCREMENT = 1', function (error, results, fields) {
        if (error)
            throw error;
    });
    mysqlConnection_1.default.query('ALTER TABLE rooms_photos AUTO_INCREMENT = 1', function (error, results, fields) {
        if (error)
            throw error;
    });
};
exports.resetAutoIncrements = resetAutoIncrements;
removeAllData();
resetAutoIncrements();
