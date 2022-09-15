"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersController_1 = __importDefault(require("../controllers/usersController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route('/')
    .get(usersController_1.default.index)
    .post(usersController_1.default.store);
router.route('/:id')
    .get(usersController_1.default.show)
    .patch(usersController_1.default.update)
    .delete(usersController_1.default.destroy);
exports.default = router;
