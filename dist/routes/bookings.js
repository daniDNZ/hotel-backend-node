"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingsController_1 = __importDefault(require("../controllers/bookingsController"));
const router = express_1.default.Router();
router.route('/')
    .get(bookingsController_1.default.index)
    .post(bookingsController_1.default.store);
router.route('/:id')
    .get(bookingsController_1.default.show)
    .patch(bookingsController_1.default.update)
    .delete(bookingsController_1.default.destroy);
exports.default = router;
