const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./user'); 

const Competition = sequelize.define("Competition", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(100000),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Competition.belongsTo(User, { foreignKey: 'userId', as: 'creator' });
Competition.belongsTo(User, { foreignKey: 'winner', as: 'winnerUser' });

module.exports = Competition;
