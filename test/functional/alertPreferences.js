'use strict';

var MentionApi = require('../..');


/*
 * https://dev.mention.com/resources/alert_preferences/
 */
describe('[Functional] Mention Api - Alert Preferences', function() {

  // Increase the timeout for this suite
  this.timeout(60000);

  // Fetch the access token from the environment
  var accessToken = process.env.NODE_MENTION_API_ACCESS_TOKEN;

  var mention = new MentionApi({
    accessToken: accessToken,
  });

  // https://dev.mention.com/resources/alert_preferences/#get-accounts-id-alerts-alert-id-preferences
  it('should allow to fetch the preferences for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_preferences/#put-accounts-id-alerts-alert-id-preferences
  it('should allow to update the preferences for a specific alert for a specific account', function() {
    // TODO
  });
});
