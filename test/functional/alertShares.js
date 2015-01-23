'use strict';

var MentionApi = require('../..');


/*
 * https://dev.mention.com/resources/alert_shares/
 */
describe('[Functional] Mention Api - Alert Shares', function() {

  // Increase the timeout for this suite
  this.timeout(60000);

  // Fetch the access token from the environment
  var accessToken = process.env.NODE_MENTION_API_ACCESS_TOKEN;

  var mention = new MentionApi({
    accessToken: accessToken,
  });

  // https://dev.mention.com/resources/alert_shares/#post-accounts-id-alerts-alert-id-shares
  it('should allow to create a share for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_shares/#get-accounts-id-alerts-alert-id-shares-share-id
  it('should allow to fetch a share for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_shares/#get-accounts-id-alerts-alert-id-shares
  it('should allow to fetch the shares for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_shares/#put-accounts-id-alerts-alert-id-shares-share-id
  it('should allow to update a share for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_shares/#delete-accounts-id-alerts-alert-id-shares-share-id
  it('should allow to delete a share for a specific alert for a specific account', function() {
    // TODO
  });
});
