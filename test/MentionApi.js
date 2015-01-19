'use strict';

var MentionApi = require('..');


describe('MentionApi', function() {

  it('should return a new MentionApi instance', function() {
    var ret = new MentionApi();
    expect(ret).to.be.an.instanceof(MentionApi);
  });

  it('should return a new MentionApi instance (event without `new`)', function() {
    var ret = MentionApi(); // jshint ignore:line
    expect(ret).to.be.an.instanceof(MentionApi);
  });
});
