"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        as: "airplane",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Seat.init(
    {
      row: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      col: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Airplanes",
          key: "id",
        },
      },
      type: {
        type: DataTypes.ENUM(
          "business",
          "economy",
          "premium-economy",
          "first-class"
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
