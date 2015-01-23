'use strict';

var crypto = require('crypto');

var MentionApi = require('../..');


/*
 * https://dev.mention.com/resources/accounts/
 */
describe('[Functional] Mention Api - Account', function() {

  // Increase the timeout for this suite
  this.timeout(60000);

  // Fetch the access token from the environment
  var accessToken = process.env.NODE_MENTION_API_ACCESS_TOKEN;

  var mention = new MentionApi({
    accessToken: accessToken,
  });

  // https://dev.mention.com/resources/accounts/#post-accounts
  it('should allow to create a user account', function(done) {
    mention().accounts().post({
      name: 'Captain Account',
      email: 'spam+mention-test-' + Date.now() + '@captaindash.com',
      password: crypto.randomBytes(64).toString('hex'),
      language_code: 'en',
      client: 'node-mention-api functional tests',
    })
      .then(function() { return done(); })
      .catch(done)
    ;
  });

  // https://dev.mention.com/resources/accounts/#get-accounts-id
  it('should allow to get a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/accounts/#get-accounts-id
  it('should allow to update a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/accounts/#get-accounts-id
  it('should allow to delete a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/accounts/#get-accounts-me
  it('should allow to get my account', function(done) {
    mention().accounts('me').get()
      .then(function() { return done(); })
      .catch(done)
    ;
  });
});
