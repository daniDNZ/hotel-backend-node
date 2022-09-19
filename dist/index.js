"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./env"));
const HOST = env_1.default.HOST || 'localhost';
const PORT = env_1.default.PORT || 3001;
app_1.default.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://${HOST}:${PORT}`);
});
