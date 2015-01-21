'use strict';

var _ = require('lodash');

var MentionApi = require('../../lib/MentionApi');
var RequestFactory = require('../../lib/RequestFactory');


var VALID_OPTIONS = {
  accessToken: Array(86 + 1).join('a')
};

describe('[Unit] new MentionApi()', function() {

  it('should return a function', function() {
    var ret = new MentionApi(VALID_OPTIONS);
    expect(ret).to.be.a('function');
  });

  it('should return a function (even without `new`)', function() {
    var ret = MentionApi(VALID_OPTIONS);
    expect(ret).to.be.a('function');
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

describe('[Unit] A MentionApi "instance function" call', function() {

  var mention = new MentionApi(VALID_OPTIONS);

  it('should create a Request instance exposing an `accounts` method', function() {
    var ret = mention();
    expect(ret).to.be.an.instanceof(mention.Request);
    expect(ret).respondTo('accounts');
  });

  it('should create a Request instance exposing an `app` method', function() {
    var ret = mention();
    expect(ret).to.be.an.instanceof(mention.Request);
    expect(ret).respondTo('app');
  });
});
