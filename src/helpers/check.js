const _ = require('lodash');
const jwt = require('jwt-simple');

const UserModel = require('../models/user').model;

exports.checkJSON = (json, keys) => {
  const jsonKeys = _.keysIn(json);

  return _.isEqual(jsonKeys.sort(), keys.sort());
};
