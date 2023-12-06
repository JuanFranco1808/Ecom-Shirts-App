const { Model, DataTypes } = require("sequelize");

const SHIRTS_TABLE = "shirts";

const shirtSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class shirtModel extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: "shirt",
      tableName: SHIRTS_TABLE,
      timestamps: false,
    };
  }
}

module.exports = { shirtModel, shirtSchema, SHIRTS_TABLE };
