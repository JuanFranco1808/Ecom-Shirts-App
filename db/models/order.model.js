const { Model, DataTypes } = require("sequelize");

const ORDERS_TABLE = "orders";

const orderSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

class orderModel extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: "order",
      tableName: ORDERS_TABLE,
      timestamps: false,
    };
  }
}

module.exports = { orderModel, orderSchema, ORDERS_TABLE };
