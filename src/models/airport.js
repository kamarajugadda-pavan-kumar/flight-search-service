"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.City, {
        foreignKey: "cityId",
        as: "city",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  Airport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Cities",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );

  return Airport;
};
