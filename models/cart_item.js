'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.cart_item.belongsTo(models.user)
      models.cart_item.belongsTo(models.product)
      models.cart_item.belongsTo(models.order)
    }
  };
  cart_item.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cart_item',
  });
  return cart_item;
};