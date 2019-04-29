'use strict';
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: (user, options) => {
        if (user.changed('password')) {
          user.password = bcrypt.hashSync(user.password)
        }
      }
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Todo, { foreignKey: 'authorId' })
  };
  return User;
};
