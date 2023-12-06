const { shirtModel, shirtSchema } = require("./shirt.model");
const { userModel, userSchema } = require("./user.model");
const { categoryModel, categorySchema } = require("./category.model");
const { orderModel, orderSchema } = require("./order.model");

function setUpModels(sequelize) {
  shirtModel.init(shirtSchema, shirtModel.config(sequelize));
  userModel.init(userSchema, userModel.config(sequelize));
  categoryModel.init(categorySchema, categoryModel.config(sequelize));
  orderModel.init(orderSchema, orderModel.config(sequelize));
}

module.exports = setUpModels;
