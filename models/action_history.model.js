module.exports = (sequelize, Sequelize) => {
    const ActionHistory = sequelize.define(
      "action_history",
      {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          device: {
            type: Sequelize.STRING,
          },
          action: {
            type: Sequelize.ENUM('on', 'off'),
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
  
    return ActionHistory;
  };
  