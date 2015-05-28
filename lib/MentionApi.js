'use strict';

var Joi = require('joi');

var RequestFactory = require('./RequestFactory');


/**
 * @class MentionApi
 *
 * @param {Object} options
 * @param {String} options.accessToken - An 86 characters access token
 *
 * @throws TypeError - If the given options are not valid
 */
function MentionApi(options) {

  // Create an new instance event without the `new` keyword

  if (!(this instanceof MentionApi)) {
    return new MentionApi(options);
  }

  // Check and normalize the options

  var validated = Joi.validate(options, Joi.object().keys({
    accessToken: Joi.string().regex(/^[a-zA-Z0-9]{86}$/).required().strict()
  }).required().strict());

  if (validated.error) {
    throw new TypeError('Invalid MentionApi options: ' + validated.error);
  }

  var _options = validated.value;

  // Create the routes

  return new RequestFactory([

    //
    // https://dev.mention.com/resources/accounts/
    //

    // https://dev.mention.com/resources/accounts/#post-accounts
    [ { accounts: Joi.any().forbidden() },
      { post: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().min(2).max(255).required(),
                password: Joi.string().min(6).required(),
                language_code: Joi.string().min(2).max(2).lowercase().required(),
                invit_id: Joi.any().optional(),
                inviter_id: Joi.any().optional(),
                client: Joi.string().optional(),
              })
                .required()
      },
    ],

    // https://dev.mention.com/resources/accounts/#get-accounts-id
    [
      { accounts: Joi.string().required() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/accounts/#put-accounts-id
    [
      { accounts: Joi.string().required() },
      { put: Joi.object().keys({
               name: Joi.string().optional(),
               email: Joi.string().email().min(2).max(255).optional(),
               old_password: Joi.string().min(6).optional(),
               new_password: Joi.string().min(6).optional(),
             })
               .with('new_password', 'old_password')
               .required()
      },
    ],

    // https://dev.mention.com/resources/accounts/#delete-accounts-id
    [
      { accounts: Joi.string().required() },
      { delete: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/accounts/#get-accounts-me
    [
      { accounts: Joi.string().valid('me').required() },
      { get: Joi.any().forbidden() }
    ],

    //
    // https://dev.mention.com/resources/alerts/
    //

    // https://dev.mention.com/resources/alerts/#post-accounts-id-alerts
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.any().forbidden() },
      { post: Joi.object().keys({
                name: Joi.string().required(),
                included_keywords: Joi.array().items(Joi.string()).optional(),
                required_keywords: Joi.array().items(Joi.string()).optional(),
                excluded_keywords: Joi.array().items(Joi.string()).optional(),
                primary_keyword: Joi.array().items(Joi.string()).optional().tags(['deprecated']),
                languages: Joi.array().items(Joi.string().min(2).max(2).lowercase()).required(),
                countries: Joi.array().items(Joi.string().min(2).max(2).uppercase()).required(),
                sources: Joi.array().items(Joi.string()).required(),
                blocked_sites: Joi.array(Joi.string()).optional(),
                noise_detection: Joi.boolean().optional(),
              })
                .or('included_keywords', 'required_keywords', 'excluded_keywords', 'primary_keyword')
                .required()
      },
    ],

    // https://dev.mention.com/resources/alerts/#get-accounts-id-alerts-alert-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alerts/#get-accounts-id-alerts
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.any().forbidden() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alerts/#put-accounts-id-alerts-alert-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { put: Joi.object().keys({
               name: Joi.string().optional(),
               included_keywords: Joi.array().items(Joi.string()).optional(),
               required_keywords: Joi.array().items(Joi.string()).optional(),
               excluded_keywords: Joi.array().items(Joi.string()).optional(),
               primary_keyword: Joi.array().items(Joi.string()).optional().tags(['deprecated']),
               languages: Joi.array().items(Joi.string().min(2).max(2).lowercase()).optional(),
               countries: Joi.array().items(Joi.string().min(2).max(2).uppercase()).optional(),
               sources: Joi.array().items(Joi.string()).optional(),
               blocked_sites: Joi.array(Joi.string()).optional(),
               noise_detection: Joi.boolean().optional(),
             })
               .required()
      },
    ],

    //
    // https://dev.mention.com/resources/alert_preferences/
    //

    // https://dev.mention.com/resources/alert_preferences/#get-accounts-id-alerts-alert-id-preferences
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { preferences: Joi.any().forbidden() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alert_preferences/#put-accounts-id-alerts-alert-id-preferences
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { preferences: Joi.any().forbidden() },
      { put: Joi.object().keys({
               email_notification_frequency: Joi.string().valid('never', 'daily', 'weekly').optional(),
               push_notification_frequency: Joi.string().valid('never', 'daily', 'weekly').optional(),
             })
               .required()
      },
    ],

    //
    // https://dev.mention.com/resources/alert_shares/
    //

    // https://dev.mention.com/resources/alert_shares/#post-accounts-id-alerts-alert-id-shares
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { shares: Joi.any().forbidden() },
      { post: Joi.object().keys({
                account_id: Joi.string().required()
              })
                .required()
      }
    ],

    // https://dev.mention.com/resources/alert_shares/#get-accounts-id-alerts-alert-id-shares-share-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { shares: Joi.string().required() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alert_shares/#get-accounts-id-alerts-alert-id-shares
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { shares: Joi.string().required() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alert_shares/#put-accounts-id-alerts-alert-id-shares-share-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { shares: Joi.string().required() },
      { put: Joi.object().keys({
               role: Joi.string().valid('user', 'admin').optional()
             })
               .required()
      },
    ],

    // https://dev.mention.com/resources/alert_shares/#delete-accounts-id-alerts-alert-id-shares-share-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { shares: Joi.string().required() },
      { delete: Joi.any().forbidden() }
    ],

    //
    // https://dev.mention.com/resources/alert_mentions/
    //

    // https://dev.mention.com/resources/alert_mentions/#get-accounts-id-alerts-alert-id-mentions
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.any().forbidden() },
      { get: Joi.object().keys({
               since_id: Joi.number().optional(),
               before_date: Joi.string().optional(),
               limit: Joi.number().min(1).max(100).optional(),
               type: Joi.string().valid('default', 'favorites', 'trashed').optional(),
               source: Joi.array().items(Joi.string()).optional(),
               unread: Joi.string().optional(),
             })
              .xor('type', 'source')
              .xor('since_id', 'before_date')
              .required()
      },
    ],

    // https://dev.mention.com/resources/alert_mentions/#get-accounts-id-alerts-alert-id-mentions-mention-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.string().required() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alert_mentions/#put-accounts-id-alerts-alert-id-mentions-mention-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.string().required() },
      { put: Joi.object().keys({
               favorite: Joi.boolean().optional(),
               trashed: Joi.boolean().optional(),
               read: Joi.boolean().optional(),
             })
               .required()
      }
    ],

    // https://dev.mention.com/resources/alert_mentions/#post-accounts-id-alerts-alert-id-mentions-markallread
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.any().forbidden() },
      { markallread: Joi.any().forbidden() },
      { post: Joi.any().forbidden() }
    ],

    //
    // https://dev.mention.com/resources/alert_mention_tasks/
    //

    // https://dev.mention.com/resources/alert_mention_tasks/#post-accounts-id-alerts-alert-id-mentions-mention-id-tasks
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.string().required() },
      { tasks: Joi.any().forbidden() },
      { post: Joi.object().keys({
                assigned_to_account_id: Joi.string().required(),
                type: Joi.string().required(),
                comment: Joi.string().optional(),
                done: Joi.boolean().required(),
              })
                .required()
      }
    ],

    // https://dev.mention.com/resources/alert_mention_tasks/#get-accounts-id-alerts-alert-id-mentions-mention-id-tasks-task-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.string().required() },
      { tasks: Joi.string().required() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alert_mention_tasks/#get-accounts-id-alerts-alert-id-mentions-mention-id-tasks
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.string().required() },
      { tasks: Joi.any().forbidden() },
      { get: Joi.any().forbidden() }
    ],

    // https://dev.mention.com/resources/alert_mention_tasks/#put-accounts-id-alerts-alert-id-mentions-mention-id-tasks-task-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.string().required() },
      { tasks: Joi.string().required() },
      { put: Joi.object().keys({
               type: Joi.string().optional(),
               comment: Joi.string().optional(),
               done: Joi.boolean().optional(),
             })
               .required()
      }
    ],

    // https://dev.mention.com/resources/alert_mention_tasks/#delete-accounts-id-alerts-alert-id-mentions-mention-id-tasks-task-id
    [
      { accounts: Joi.string().required() },
      { alerts: Joi.string().required() },
      { mentions: Joi.string().required() },
      { tasks: Joi.string().required() },
      { delete: Joi.any().forbidden() }
    ],

    //
    // https://dev.mention.com/resources/app_data/
    //

    // https://dev.mention.com/resources/app_data/#get-app-data
    [
      { app: Joi.any().forbidden() },
      { data: Joi.any().forbidden() },
      { get: Joi.any().forbidden() }
    ],

  ], {
    baseUri: 'https://api.mention.net/api',
    headers: {
      Authorization: 'Bearer ' + _options.accessToken,
    }
  });
}


module.exports = MentionApi;
