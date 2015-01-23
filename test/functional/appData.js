'use strict';

var MentionApi = require('../..');


/*
 * https://dev.mention.com/resources/app_data/
 */
describe('[Functional] Mention Api - App Data', function() {

  // Increase the timeout for this suite
  this.timeout(60000);

  // Fetch the access token from the environment
  var accessToken = process.env.NODE_MENTION_API_ACCESS_TOKEN;

  var mention = new MentionApi({
    accessToken: accessToken,
  });

  // https://dev.mention.com/resources/app_data/#get-app-data
  it('should allow to fetch application data', function() {
    // TODO
  });
});
