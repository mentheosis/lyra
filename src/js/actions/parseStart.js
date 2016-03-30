'use strict';
var PARSE_START = require('../constants/actions').PARSE_START;

/**
 * Action creator to set the state to represent an in-progress Lyra model parse.
 *
 * @returns {Object} An action object
 */
module.exports = function() {
  return {
    type: PARSE_START
  };
};
