'use strict';

var BPromise = require('bluebird');
var nock = require('nock');

var RequestFactory = require('../../lib/RequestFactory');

var BASE_URI = 'http://example.com';


describe('[Unit] new RequestFactory()', function() {

  it('should return a factory function', function() {
    var ret = new RequestFactory();
    expect(ret).to.be.a('function');
  });
});

describe('[Unit] A RequestFactory "instance function" call', function() {

  var mention = new RequestFactory([
    [ { test: null }, { post: null } ],
    [ { test: null }, { get: null } ],
    [ { test: null }, { put: null } ],
    [ { test: null }, { delete: null } ],
  ], { baseUri: BASE_URI });

  it('should create a Request instance', function() {
    var ret = mention();
    expect(ret).to.be.an.instanceof(mention.Request);
  });

  it('should query the base URI by default', function(done) {
    var api = nock(BASE_URI)
      .get('/')
      .reply(200)
    ;

    mention().get()
      .finally(function() {
        expect(api.isDone()).to.be.true;
        done();
      })
    ;
  });

  it('should return a promise resolving with the parsed JSON body', function(done) {
    var json = {
      foo: 'bar'
    };
    var api = nock(BASE_URI)
      .post('/test')
      .reply(200, json)
    ;
    var ret = mention().test().post({ foo: 'bar' });

    expect(ret).to.be.an.instanceof(BPromise);
    ret
      .then(function(body) {
        expect(body).to.deep.equal(json);
        expect(api.isDone()).to.be.true;
        done();
      })
    ;
  });

  it('should reject the promise if a network error occurs', function(done) {
    nock.disableNetConnect();

    mention().post()
      .then(function() { done(new Error('Not supposed to succeed')); })
      .catch(function() { done(); })
      .finally(function() { nock.enableNetConnect(); })
    ;
  });

  it('should reject the promise if the HTTP code != 2xx', function(done) {
    var api = nock(BASE_URI)
      .post('/')
      .reply(404)
    ;

    mention().post()
      .then(function() { done(new Error('Not supposed to succeed')); })
      .catch(function() { done(); })
    ;
  });

  it('should correctly pass the body of POST requests', function(done) {
    var api = nock(BASE_URI)
      .post('/test', { foo: 'bar' })
      .reply(200)
    ;

    mention().test().post({ foo: 'bar' })
      .then(function() {
        expect(api.isDone()).to.be.true;
        done();
      })
      .catch(done)
    ;
  });

  it('should correctly pass the querystring of GET requests', function(done) {
    var api = nock(BASE_URI)
      .get('/test?foo=bar')
      .reply(200)
    ;

    mention().test().get({ foo: 'bar' })
      .then(function() {
        expect(api.isDone()).to.be.true;
        done();
      })
      .catch(done)
    ;
  });

  it('should correctly pass the body of PUT requests', function(done) {
    var api = nock(BASE_URI)
      .put('/test', { foo: 'bar' })
      .reply(200)
    ;

    mention().test().put({ foo: 'bar' })
      .then(function() {
        expect(api.isDone()).to.be.true;
        done();
      })
      .catch(done)
    ;
  });

  it('should ignore the body of DELETE requests', function(done) {
    var api = nock(BASE_URI)
      .delete('/test')
      .reply(204)
    ;

    mention().test().delete({ foo: 'bar' })
      .then(function() {
        expect(api.isDone()).to.be.true;
        done();
      })
      .catch(done)
    ;
  });
});
