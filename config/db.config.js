module.exports = {
    HOST: "localhost",
    PORT: 5432,
    USER: "odoo17",
    PASSWORD: "admin",
    DB: "smart_home",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };