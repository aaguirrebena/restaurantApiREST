import express from "express";

module.exports = app => {

    //settings
    app.set(`port`, process.env.PORT || 3000);

    //middlewares -- se ejecuta ante de procesar los datos
    app.use(express.json());

};