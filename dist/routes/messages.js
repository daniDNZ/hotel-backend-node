"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = __importDefault(require("../controllers/messagesController"));
const router = express_1.default.Router();
router.route('/')
    .get(messagesController_1.default.index)
    .post(messagesController_1.default.store);
router.route('/:id')
    .get(messagesController_1.default.show)
    .patch(messagesController_1.default.update)
    .delete(messagesController_1.default.destroy);
exports.default = router;
