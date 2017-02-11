'use strict';
module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define('Team', {
    email1: DataTypes.STRING,
    email2: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    email3: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    email4: {
      type: DataTypes.STRING,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Team.hasMany(models.User);
      }
    }
  });
  return Team;
};
