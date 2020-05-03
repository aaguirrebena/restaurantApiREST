module.exports = app => {

    const Ingredients = app.db.models.Ingredient;
    const Hamburgers = app.db.models.Hamburger;

    async function fun(req){
        const all = await Hamburgers.findAll({
            include: [Ingredients]
        });
        var boo = false;
        all.forEach(todo=>{
            if(todo.Ingredients[0]){
                todo.Ingredients.forEach(q=>{
                    if (q.HamburgerIngredient.IngredientId == req.params.id){
                        console.log("EXISTO EN ALGUNA HAMBURGUESA")
                        boo = true;
                        return;
                    }
                })
            }
        })
        return boo;
    }

    app.route("/ingrediente")

        .get((req, res) => {

            Ingredients.findAll({
                attributes: ["id", "name", "description"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })

        .post((req, res) => {
            Ingredients.create(req.body)
                .then(result => res.status(201).json(result))
                .catch(error => {
                    res.status(400).json({msg: error.message});
                });
        });

    app.route("/ingrediente/:id")

        .get((req, res) => {
            Ingredients.findByPk(req.params.id,
                {attributes: ["id", "name", "description"]})
                .then(result => {
                    if (!result){
                        if(isNaN(req.params.id)){ //BadRequest
                            res.status(400).json({msg: "Ingrediente Invalido"}) //Ingrediente invalido: string
                        }
                        else{ //NotFound
                            res.status(404).json({msg: "Ingrediente Inexistente"}) //Ingrediente inexistente: int
                        }
                    }
                    else{
                        res.json(result)
                    }
                });
        })

        .patch((req, res) => {
            Ingredients.update(req.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })

        .delete(async(req, res) => {
            var boo = await fun(req);
            if (!boo){
                Ingredients.destroy({where: req.params})
                    .then(result => {
                        if (result){
                            res.sendStatus(200)
                        }
                        else{
                            res.status(404).json({msg: "Not Found"})
                        }
                    })
            }
            else{
                res.status(409).json({msg: "Ingrediente no se puede borrar, se encuentra presente en una hamburguesa"})
            }
        });
};
