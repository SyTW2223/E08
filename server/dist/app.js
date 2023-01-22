"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const default_1 = require("./routers/default");
const post_1 = require("./routers/post");
const get_1 = require("./routers/get");
const patch_1 = require("./routers/patch");
const delete_1 = require("./routers/delete");
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(post_1.postRouter);
app.use(get_1.getRouter);
app.use(patch_1.patchRouter);
app.use(delete_1.deleteRouter);
app.use(default_1.defaultRouter);
exports.default = app;
