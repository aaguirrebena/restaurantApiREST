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
        nombre: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        precio: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        descripcion: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        imagen: {
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