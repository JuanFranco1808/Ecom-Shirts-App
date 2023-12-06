const { Model, DataTypes } = require("sequelize");

const CATEGORIES_TABLE = "categories";

const categorySchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class categoryModel extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: "category",
      tableName: CATEGORIES_TABLE,
      timestamps: false,
    };
  }
}

module.exports = { categoryModel, categorySchema, CATEGORIES_TABLE };
