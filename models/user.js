var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from user');
  },

  add: entity => {
    return db.add('user', entity);
  },

  findOne: entity => {
    return db.load(`select id,username,password,nickname from user where username="${entity.username}" limit 1`)
  },

  edit: entity => {
    return db.update('user', 'username', entity);
  }

};
