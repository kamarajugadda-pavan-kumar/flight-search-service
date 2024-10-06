"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
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
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        targetKey: "code",
        as: "departureAirport",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        targetKey: "code",
        as: "arrivalAirport",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  Flight.init(
    {
      flightNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Airplane",
          key: "id",
        },
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Airport",
          key: "code",
        },
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Airport",
          key: "code",
        },
      },
      arrivalTime: { type: DataTypes.DATE, allowNull: false },
      departureTime: { type: DataTypes.DATE, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      boardingGate: { type: DataTypes.STRING, allowNull: false },
      totalSeats: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
