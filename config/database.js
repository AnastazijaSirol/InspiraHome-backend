const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:PfOdltFXIgiLBPSthxJKzZJJBTMjJqFK@autorack.proxy.rlwy.net:30275/railway', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
