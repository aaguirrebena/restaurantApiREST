module.exports = app => {

    const Hamburgers = app.db.models.Hamburger;
    const Ingredients = app.db.models.Ingredient;

    function pathReturn(burger, ing){
        var path = "PATH";
        burger.Ingredients.forEach(q=>{
            if (q.HamburgerIngredient.IngredientId == ing.id){
                path = q.HamburgerIngredient.path
                return;
            }
        })
        return path;
    }

    function ingredientInBurger(burger, ing){
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
        .get((req, res) => {
            Hamburgers.findAll({
                attributes: ["id", "name", "price", "description", "image"],
                include: {
                    model: Ingredients,
                    through: {
                      attributes: ["path"]
                    }
                }
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })

        .post((req, res) => {
            Hamburgers.create(req.body)
                .then(result => res.status(201).json(result))
                .catch(error => {
                    res.status(400).json({msg: error.message});
                });
        });

    app.route("/hamburguesa/:id")

        .get((req, res) => {
            Hamburgers.findByPk(req.params.id, {
                attributes: ["id", "name", "price", "description", "image"],
                include: {
                    model: Ingredients,
                    through: {
                      attributes: []
                    }
                }
              })
              .then(result => {
                if (!result){
                    if(isNaN(req.params.id)){ //BadRequest
                        res.status(400).json({msg: "Hamburguesa Invalida"}) //: string
                    }
                    else{ //NotFound
                        res.status(404).json({msg: "Hamburguesa Inexistente"}) //: int
                    }
                }
                else{
                    res.json(result)
                }
            });
        })
        .patch((req, res) => {
            Hamburgers.update(req.body, {where: req.params})
            .then(result => {
                if (!result[0]){
                    if(isNaN(req.params.id)){ //BadRequest
                        res.status(400).json({msg: "Hamburguesa Invalida"}) //: string
                    }
                    else{ //NotFound
                        res.status(404).json({msg: "Hamburguesa Inexistente"}) //: int
                    }
                }
                else{
                    res.json(req.body)
                }
            })
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
            const con = ingredientInBurger(burger, ing);

            if (burger && ing){ // Si existen ambos
                if (con){
                    res.status(409).json({msg: "Hamburguesa ya contiene este ingrediente"})
                }
                else {
                    var _path = `https://hamburgueseria.com/ingrediente/${req.params.id2}`
                    console.log("AGREGO: ", _path)
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
            const ing_path = pathReturn(burger, ing);
 
            if (burger && ing && exi){ // Si existen ambos
                console.log("Retiro: ", ing_path)
                res.status(200).json({msg: "Ingrediente retirado"})
                burger.removeIngredient(ing)
            }
            else if (burger && ing && !exi){
                res.status(404).json({msg: "Ingrediente inexistente en la hamburguesa"})
            }
            else {
                console.log("NO EXISTE")
                res.status(400).json({msg: "id invalido"})
            };
        });
};