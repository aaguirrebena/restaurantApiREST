module.exports = app => {

    const Hamburgers = app.db.models.Hamburger;
    const Ingredients = app.db.models.Ingredient;

    function pathReturn(burger, ing){
        //burger object wich contain ing object
        //return: path assocation to the ing in burger
        var path = "PATH";
        burger.Ingredients.forEach(q=>{
            if (q.HamburgerIngredient.IngredientId == ing.id){
                path = q.HamburgerIngredient.path
                return;
            }
        })
        return path;
    }

    function pathsArray(burger){
        //burger object
        //return: array with ingredients path associate
        var paths = [];
        burger.Ingredients.forEach(q=>{
            const ad = q.HamburgerIngredient.path
            paths.push({"path": ad});
            }
        )
        return paths;
    }

    function ingredientInBurger(burger, ing){
        //burger: Hamburger model
        //ing: Ingredient model
        //return false if burger doesn't contain ing, true if does
        var con = false;
        burger.Ingredients.forEach(q=>{
            if (q.HamburgerIngredient.IngredientId == ing.id){
                con = true;
                return;
            }
        })
        return con;
    }

    app.route("/hamburguesa") //All Burgers and create a new one

        .get(async(req, res) => {
            const bs = await Hamburgers.findAll({
                attributes: ["id", "nombre", "precio", "descripcion", "imagen"],
                include: [{
                    model: Ingredients,
                    attributes: ["id"],
                    through: {
                      attributes: ["path"]
                    }
                }]
            })

            .then(result => {
                console.log(result[0].id)
                res.json(result)
            })
            // .catch(error => {
            //     res.status(412).json({msg: error.message});
            // });
        })

        .post(async (req, res) => {
            Hamburgers.create(req.body)
            // console.log(b)
            .then(result => {
                const r = {
                    "id": result.id,
                    "nombre":req.body.nombre,
                    "precio": req.body.precio,
                    "descripcion": req.body.descripcion,
                    "imagen": req.body.imagen,
                    "ingredientes": []
                }
                res.status(201).json(r)
                })
            .catch(error => {
                    res.status(400).json({msg: error.message});
                });
        });

    app.route("/hamburguesa/:id")

        .get((req, res) => {
            Hamburgers.findByPk(req.params.id, {
                attributes: ["id", "nombre", "precio", "descripcion", "imagen"],
                include: [{
                    model: Ingredients,
                    attributes: ["id"],
                    through: {
                      attributes: ["path"]
                    }
                }]
            })
            .then(async result => {
                if (!result){
                    if(isNaN(req.params.id)){ //BadRequest
                        res.status(400).json({msg: "Hamburguesa Invalida"}) //: string
                    }
                    else{ //NotFound
                        res.status(404).json({msg: "Hamburguesa Inexistente"}) //: int
                    }
                }
                else{
                    const b = await Hamburgers.findByPk(req.params.id, {attributes: ["id", "nombre", "precio", "descripcion", "imagen"],
                    include: [{
                        model: Ingredients,
                        attributes: ["id"],
                        through: {
                        attributes: ["path"]
                        }
                    }]})
                    var pArray = pathsArray(b);
                    const r = {
                        "id": b.id,
                        "nombre":b.nombre,
                        "precio": b.precio,
                        "descripcion": b.descripcion,
                        "imagen": b.imagen,
                        "ingredientes": pArray
                        }
                    res.json(r)
                }
            });
        })
        .patch((req, res) => {
            if(req.body.id){
                res.status(400).json({msg: "Id no se puede editar "})
            }
            else{
                Hamburgers.update(req.body, {where: req.params})
                .then(async result => {
                    if (!result[0]){
                        if(isNaN(req.params.id)){ //BadRequest
                            res.status(400).json({msg: "Hamburguesa Invalida"}) //: string
                        }
                        else{ //NotFound
                            res.status(404).json({msg: "Hamburguesa Inexistente"}) //: int
                        }
                    }
                    else{
                         const b = await Hamburgers.findByPk(req.params.id, {attributes: ["id", "nombre", "precio", "descripcion", "imagen"],
                         include: [{
                             model: Ingredients,
                             attributes: ["id"],
                             through: {
                               attributes: ["path"]
                             }
                         }]})
                         var pArray = pathsArray(b);
                         const r = {
                                "id": b.id,
                                "nombre":b.nombre,
                                "precio": b.precio,
                                "descripcion": b.descripcion,
                                "imagen": b.imagen,
                                "ingredientes": pArray
                                }
                         res.json(r)
                    }
                })
            }
        })
        .delete((req, res) => {
            Hamburgers.destroy({where: req.params})
            .then(result => {
                if (result){
                    res.status(200).json({msg: "Hamburguesa Eliminada"})
                }
                else{
                    res.status(404).json({msg: "Not Found"})
                }
            })
        });

    app.route("/hamburguesa/:id1/ingrediente/:id2")

        .put(async(req, res) => {
            const burger = await Hamburgers.findByPk(req.params.id1, {include: [Ingredients]});
            const ing = await Ingredients.findByPk(req.params.id2);

            if (burger && ing){ // Si existen ambos
                const con = ingredientInBurger(burger, ing);
                if (con){
                    res.status(200).json({msg: "Hamburguesa ya contiene este ingrediente"})
                }
                else {
                    var _path = `https://restaurantapirest.herokuapp.com/ingrediente/${req.params.id2}`
                    // console.log("AGREGO: ", _path)
                    // console.log(burger.ingredients)
                    res.status(201).json({msg: "Ingrediente Agregado"})
                    burger.addIngredient(ing, { through: { path: _path } });
                }
            }
            else if(!burger){
                res.status(400).json({msg: "Hamburguesa invalida"})
            }
            else if(!ing){
                res.status(404).json({msg: "Ingrediente invalido"})

            };
        })
        .delete(async(req, res) => {
            const burger = await Hamburgers.findByPk(req.params.id1, {include: [Ingredients]});
            const ing = await Ingredients.findByPk(req.params.id2);
            const exi = await burger.hasIngredient(ing);
            // const ing_path = pathReturn(burger, ing); //obtiene el path

            if (burger && ing && exi){ // Si existen ambos
                // console.log("Retiro: ", ing_path)
                res.status(200).json({msg: "Ingrediente retirado"})
                burger.removeIngredient(ing)
            }
            else if (burger && ing && !exi){
                res.status(404).json({msg: "Ingrediente inexistente en la hamburguesa"})
            }
            else {
                // console.log("NO EXISTE")
                res.status(400).json({msg: "id invalido"})
            };
        });
};