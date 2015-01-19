'use strict';

var Joi = require('joi');


/**
 * @class MentionApi
 *
 * @param {Object} options
 * @param {String} options.accessToken - An 86 characters access token
 *
 * @throws TypeError - If the given options are not valid
 */
function MentionApi(options) {

  // Create an new instance event without the `new` keyword

  if (!(this instanceof MentionApi)) {
    return new MentionApi(options);
  }

  // Check and normalize the options

  var validated = Joi.validate(options, Joi.object().keys({
    accessToken: Joi.string().regex(/^[a-zA-Z0-9]{86}$/).required().strict()
  }).required().strict());

  if (validated.error) {
    throw new TypeError('Invalid MentionApi options: ' + validated.error);
  }

  options = validated.value;
}


module.exports = MentionApi;
