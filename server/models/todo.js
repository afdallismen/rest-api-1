'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    authorId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    Todo.belongsTo(models.User, { foreignKey: 'authorId' })
  };
  return Todo;
};
