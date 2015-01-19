'use strict';

var _ = require('lodash');

var MentionApi = require('..');


var VALID_OPTIONS = {
  accessToken: Array(86 + 1).join('a')
};

describe('new MentionApi()', function() {

  it('should return a new MentionApi instance', function() {
    var ret = new MentionApi(VALID_OPTIONS);
    expect(ret).to.be.an.instanceof(MentionApi);
  });

  it('should return a new MentionApi instance (even without `new`)', function() {
    var ret = MentionApi(VALID_OPTIONS);
    expect(ret).to.be.an.instanceof(MentionApi);
  });

  it('should throw a TypeError if `options` is missing or invalid', function() {
    expect(function() { new MentionApi(); }).to.throw(TypeError);
    expect(function() { new MentionApi(null); }).to.throw(TypeError);
    expect(function() { new MentionApi({}); }).to.throw(TypeError);
  });

  it('should throw a TypeError if `options.accessToken` is invalid', function() {
    expect(function() { new MentionApi(_.merge({}, VALID_OPTIONS, { accessToken: 0 })); }).to.throw(TypeError);
  });
});
