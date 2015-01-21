'use strict';

var _ = require('lodash');
var BPromise = require('bluebird');
var request = require('request');


/**
 * @param {Object[]} schemas - An array of Joi schemas
 */
function RequestFactory(schemas, options) {

  if (!_.isArray(schemas)) { schemas = []; }
  if (!_.isObject(options)) { options = {}; }

  function Request() {
    this._options = options;
    this._fullpath = [options.baseUri];
  }

  var paths = _extractPaths(schemas);
  _decoreWithRequestPaths(Request.prototype, paths);

  function factory() {
    return new Request();
  }
  factory.Request = Request;

  return factory;
}

/**
 * @param {Object[]} schemas
 */
function _extractPaths(schemas) {

  var paths = [];

  for (var idx = 0, lim = schemas.length; idx < lim; idx += 1) {
    Array.prototype.push.apply(paths, _.flatten(_.map(schemas[idx], _.keys)));
  }

  return _.uniq(paths);
}

/**
 * @param {RequestFactory} context - The context in which the paths should be added
 * @param {String[]} paths
 */
function _decoreWithRequestPaths(context, paths) {

  paths.forEach(function(path) {
    if (['post', 'get', 'put', 'delete'].indexOf(path) > -1) {

      context[path] = function(query) {
        var method = path.toUpperCase();

        if (!_.isObject(query)) { query = {}; }

        var options = {
          method: method,
          uri: _.compact(this._fullpath).join('/'),
          headers: this._options.headers,
          json: true,
        };

        if (['GET'].indexOf(method) > -1) {
          options.qs = query;
        }

        if (['POST', 'PUT'].indexOf(method) > -1) {
          options.body = query;
        }

        return new BPromise(function(resolve, reject) {
          return request(options, function(err, response, body) {
            if (err) {
              return reject(err);
            }
            if (((response.statusCode / 100) | 0) !== 2) {
              return reject(new Error(method + ' on ' + options.uri + ' answers with a ' + response.statusCode + '\n' + JSON.stringify(body)));
            }
            return resolve(body);
          });
        });
      };

    } else {

      context[path] = function(specifier) {
        this._fullpath.push(path, specifier);

        return this;
      };

    }
  });
}


module.exports = RequestFactory;
