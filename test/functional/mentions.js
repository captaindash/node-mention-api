'use strict';

var MentionApi = require('../..');


/*
 * https://dev.mention.com/resources/alert_mentions/
 */
describe('[Functional] Mention Api - Mentions', function() {

  // Increase the timeout for this suite
  this.timeout(60000);

  // Fetch the access token from the environment
  var accessToken = process.env.NODE_MENTION_API_ACCESS_TOKEN;

  var mention = new MentionApi({
    accessToken: accessToken,
  });

  // https://dev.mention.com/resources/alert_mentions/#get-accounts-id-alerts-alert-id-mentions
  it('should allow to fetch the mentions for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_mentions/#get-accounts-id-alerts-alert-id-mentions-mention-id
  it('should allow to fetch a specific mention for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_mentions/#put-accounts-id-alerts-alert-id-mentions-mention-id
  it('should allow to update a specific mention for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_mentions/#post-accounts-id-alerts-alert-id-mentions-markallread
  it('should allow to mark all mentions as read for a specific alert for a specific account', function() {
    // TODO
  });
});
