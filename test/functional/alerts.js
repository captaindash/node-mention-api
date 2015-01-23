'use strict';

var MentionApi = require('../..');


/*
 * https://dev.mention.com/resources/alerts/
 */
describe('[Functional] Mention Api - Alerts', function() {

  // Increase the timeout for this suite
  this.timeout(60000);

  // Fetch the access token from the environment
  var accessToken = process.env.NODE_MENTION_API_ACCESS_TOKEN;

  var mention = new MentionApi({
    accessToken: accessToken,
  });

  // https://dev.mention.com/resources/accounts/#get-accounts-me
  it('should allow to create a new alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alerts/#get-accounts-id-alerts-alert-id
  it('should allow to fetch a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alerts/#get-accounts-id-alerts
  it('should allow to get all the alerts for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alerts/#put-accounts-id-alerts-alert-id
  it('should allow to update a specific alert for a specific account', function() {
    // TODO
  });
});
