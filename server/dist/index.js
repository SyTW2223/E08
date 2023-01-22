"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./db/mongoose");
const app_1 = require("./app");
const port = process.env.PORT || 8000;
const server = app_1.default.listen(port, () => {
    console.log(`Server up on port ${port}`);
});
exports.default = server;
