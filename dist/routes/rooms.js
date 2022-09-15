"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const roomsController_1 = __importDefault(require("../controllers/roomsController"));
const router = (0, express_1.Router)();
router.route('/')
    .get(roomsController_1.default.index)
    .post(roomsController_1.default.store);
router.route('/:id')
    .get(roomsController_1.default.show)
    .patch(roomsController_1.default.update)
    .delete(roomsController_1.default.destroy);
exports.default = router;
