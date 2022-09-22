"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const env_1 = __importDefault(require("../env"));
const connection = mysql_1.default.createConnection({
    host: env_1.default.HOST,
    user: env_1.default.DB_USER,
    password: env_1.default.DB_PASSWORD,
    database: env_1.default.DB_NAME
});
connection.connect((err) => {
    if (err) {
        console.error(err);
        return console.error('ERROR: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});
exports.default = connection;
