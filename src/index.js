import express from "express";
import consign from "consign";
import regeneratorRuntime from "regenerator-runtime";

const app = express();

consign({
    cwd: __dirname
})
    .include(`libs/config.js`)
    .then(`db.js`)
    .then(`libs/middlewares.js`) //recibe primer archivo y toma primer parametro de config --app
    .then(`routes`)
    .then(`libs/boot.js`)
    .into(app) // ejecuta archivos anteriores
