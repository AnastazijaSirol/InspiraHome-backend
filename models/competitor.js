const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require('./user'); 
const Competition = require('./competition');

const Competitor = sequelize.define("Competitor", {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    winner: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

Competitor.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Competitor.belongsTo(Competition, { foreignKey: 'competitionId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Competitor;
