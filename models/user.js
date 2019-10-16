var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from user');
  },

  add: entity => {
    return db.add('user', entity);
  },

};
