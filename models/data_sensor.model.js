module.exports = (sequelize, Sequelize) => {
    const DataSensor = sequelize.define(
      "action_history",
      {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          temperature: {
            type: Sequelize.DECIMAL(5, 2),
          },
          humidity: {
            type: Sequelize.DECIMAL(5, 2),
          },
          light: {
            type: Sequelize.DECIMAL(5, 2),
          },
          createdat: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
        },
      {
        tableName: "action_history",
      }
    );
  
    return DataSensor;
  };
  