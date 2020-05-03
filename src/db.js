import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

let db = null;

module.exports = app => {

    const config = app.libs.config;

    if (!db) {
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {} //Objeto donde se guardaran los modelos
        };

        const dir = path.join(__dirname, "models"); //obtiene carpeta models
        fs.readdirSync(dir).forEach(filename => {
            const modelDir = path.join(dir, filename); //obtiene direccion de cada modelo en models
            const model = sequelize.import(modelDir); //ejecuta archivos dentro de models 1x1, devuelve un objeto, con un name del modelo
            db.models[model.name] = model;
        }); //leer directorio de manera Syncrona

        Object.keys(db.models).forEach(key => {
            db.models[key].associate(db.models);
        });
    }

    return db;

};