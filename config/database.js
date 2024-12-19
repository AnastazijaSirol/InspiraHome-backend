const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://inspira_home_bg4o_user:8rYimYi35fhBbGKtfDwuBsm82Drx5jv0@dpg-cthg6f5ds78s73f96bm0-a.oregon-postgres.render.com/inspira_home_bg4o', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
