'use strict';

var Svgo = require('svgo');
var Promise = require('promise');
var extend = require('extend-shallow');

exports.name = 'svgo';
exports.inputFormats = ['svg'];
exports.outputFormat = 'svg';

exports.renderAsync = function (str, options, locals) {
  return new Promise(function (resolve, reject) {
    var svgo = new Svgo(extend({}, options, locals));
    svgo.optimize(str, function (result) {
      if (result.data) {
        return resolve(result.data);
      }
      else {
        reject(result)
      }
    });
  });
};

exports.render = function (str, options, locals) {
  var svgo = new Svgo(extend({}, options, locals));
  var data;

  svgo.optimize(str, function (result) {
    data = result.data
  });

  while (data === undefined) { /* waiting for data */ };

  return data;
};
