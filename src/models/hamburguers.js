module.exports = (sequelize, DataType) => {

    const HamburgerIngredient = sequelize.define('HamburgerIngredient', {
        path: {
            type: DataType.STRING
        }
    });

    const Hamburger = sequelize.define("Hamburger", {
         id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        price: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        image: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    //Se guarda la tabla adicion con nombre HamburguerIngredient, con ambas leys
    Hamburger.associate = (models) => {
        Hamburger.belongsToMany(models.Ingredient, { through: "HamburgerIngredient"});
    };

    return Hamburger;

};