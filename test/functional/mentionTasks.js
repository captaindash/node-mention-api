'use strict';

var MentionApi = require('../..');


/*
 * https://dev.mention.com/resources/alert_mention_tasks/
 */
describe('[Functional] Mention Api - Mention Tasks', function() {

  // Increase the timeout for this suite
  this.timeout(60000);

  // Fetch the access token from the environment
  var accessToken = process.env.NODE_MENTION_API_ACCESS_TOKEN;

  var mention = new MentionApi({
    accessToken: accessToken,
  });

  // https://dev.mention.com/resources/alert_mention_tasks/#post-accounts-id-alerts-alert-id-mentions-mention-id-tasks
  it('should allow to create a task for a specific mention for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_mention_tasks/#get-accounts-id-alerts-alert-id-mentions-mention-id-tasks-task-id
  it('should allow to get a task for a specific mention for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_mention_tasks/#get-accounts-id-alerts-alert-id-mentions-mention-id-tasks
  it('should allow to get the tasks for a specific mention for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_mention_tasks/#put-accounts-id-alerts-alert-id-mentions-mention-id-tasks-task-id
  it('should allow to update a task for a specific mention for a specific alert for a specific account', function() {
    // TODO
  });

  // https://dev.mention.com/resources/alert_mention_tasks/#delete-accounts-id-alerts-alert-id-mentions-mention-id-tasks-task-id
  it('should allow to delete a task for a specific mention for a specific alert for a specific account', function() {
    // TODO
  });
});
