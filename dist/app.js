"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const users_1 = __importDefault(require("./routes/users"));
const users_2 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const index_1 = __importDefault(require("./routes/index"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = __importDefault(require("./db/connection"));
require('./auth/auth');
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
(0, connection_1.default)().catch(err => console.error(err));
app.use('/', index_1.default);
app.use('/rooms', passport_1.default.authenticate('jwt', { session: false }), rooms_1.default);
app.use('/bookings', passport_1.default.authenticate('jwt', { session: false }), bookings_1.default);
app.use('/users', passport_1.default.authenticate('jwt', { session: false }), users_1.default);
app.use('/messages', passport_1.default.authenticate('jwt', { session: false }), users_2.default);
app.use('/login', login_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json({ success: false, message: `Error ${err.status}` });
});
exports.default = app;
