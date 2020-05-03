module.exports = app => {
    app.get("/", (req, res) => {
        res.json({"Inicio": "Bienvenido a la Hamburgueseria",
         "Uso": "Se recomienda utilizar un programa como Postman para agregar informacion de hamburguesas e ingredientes",
         "Consultas": {
            "Hamburguesas": [{"[GET] Obtener todas las hamburguesas": "/hamburguesa",
                            "[GET] Obtener una hamburguesas by id": "/hamburguesa",
                            "[POST] Crear una hamburguesa nueva by id": "/hamburguesa/id",
                            "[DELETE] Eliminar una hamburguesa by id": "/hamburguesa/id",
                            "[PATCH] Modificar una hamburguesa by id": "/hamburguesa/id",
                            "[PUT] Agregar ingrediente a una hamburguesa": "/hamburguesa/id_hamburguesa/ingrediente/id_ingrediente",
                            "[DELETE] ELIMINAR ingrediente a una hamburguesa": "/hamburguesa/id_hamburguesa/ingrediente/id_ingrediente"
                        }],
            "Ingredientes": [{"[GET] Obtener todas los ingredientes": "/ingrediente",
                            "[POST] Crear un ingrediente nuevo by id": "/ingrediente/id",
                            "[DELETE] Eliminar un ingrediente by id": "/ingrediente/id",
                            "[GET] Obtener un ingrediente by id": "/ingrediente/id"
        }],
        }})
    })
};