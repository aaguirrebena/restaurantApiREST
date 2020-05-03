module.exports = (sequelize, DataType) => {

    const Ingredient = sequelize.define("Ingredient", {
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
        description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }

        }
    });

    Ingredient.associate = (models) => {
        Ingredient.belongsToMany(models.Hamburger, { through: "HamburgerIngredient"});
    };

    return Ingredient;

};