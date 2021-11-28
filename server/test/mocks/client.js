export default class Client {
  constructor(error = '') {
    this.error = error || null
  }

  successResponse = (endpoint) => ({
    '/tickets/count': {
      data: {
        count: {
          refreshed_at: '2020-04-06T02:18:17Z',
          value: 102
        }
      },
      headers: {
        ['x-rate-limit']: 400,
        ['x-rate-limit-remaining']: 399
      }
    },
    '/tickets': {
      data: {
        tickets: [
          {
            assignee_id: 235323,
            collaborator_ids: [
              35334,
              234
            ],
            created_at: '2009-07-20T22:55:29Z',
            custom_fields: [
              {
                id: 27642,
                value: '745'
              },
              {
                id: 27648,
                value: 'yes'
              }
            ],
            description: 'The fire is very colorful.',
            due_at: null,
            external_id: 'ahg35h3jh',
            follower_ids: [
              35334,
              234
            ],
            group_id: 98738,
            has_incidents: false,
            id: 35436,
            organization_id: 509974,
            priority: 'high',
            problem_id: 9873764,
            raw_subject: '{{dc.printer_on_fire}}',
            recipient: 'support@company.com',
            requester_id: 20978392,
            satisfaction_rating: {
              comment: 'Great support!',
              id: 1234,
              score: 'good'
            },
            sharing_agreement_ids: [
              84432
            ],
            status: 'open',
            subject: 'Help, my printer is on fire!',
            submitter_id: 76872,
            tags: [
              'enterprise',
              'other_tag'
            ],
            type: 'incident',
            updated_at: '2011-05-05T10:38:52Z',
            url: 'https://company.zendesk.com/api/v2/tickets/35436.json',
            via: {
              channel: 'web'
            }
          }
        ],
        users: [
          {
            'id': 1523620342702,
            'url': 'https://zccpriyadarshan.zendesk.com/api/v2/users/1523620342702.json',
            'name': 'Priyadarshan Vijay',
            'email': 'priyadarshan@nyu.edu',
            'created_at': '2021-11-20T06:29:05Z',
            'updated_at': '2021-11-27T22:53:01Z',
            'time_zone': 'America/New_York',
            'iana_time_zone': 'America/New_York',
            'phone': null,
            'shared_phone_number': null,
            'photo': null,
            'locale_id': 1,
            'locale': 'en-US',
            'organization_id': 1500628016021,
            'role': 'admin',
            'verified': true,
            'external_id': null,
            'tags': [],
            'alias': null,
            'active': true,
            'shared': false,
            'shared_agent': false,
            'last_login_at': '2021-11-27T22:53:01Z',
            'two_factor_auth_enabled': null,
            'signature': null,
            'details': null,
            'notes': null,
            'role_type': null,
            'custom_role_id': null,
            'moderator': true,
            'ticket_restriction': null,
            'only_private_comments': false,
            'restricted_agent': false,
            'suspended': false,
            'default_group_id': 1500006569341,
            'report_csv': true,
            'user_fields': {}
          }
        ]
      },
      headers: {
        ['x-rate-limit']: 400,
        ['x-rate-limit-remaining']: 399
      }
    }
  }[endpoint]) || (() => { throw new Error('Not Implemented') })();

  errorResponse = (errorType) => {
    const errorData = {
      rateLimitError: {
        status: 429,
        message: 'Too many requests',
        data: {
          error: 'APIRateLimitExceeded',
          description: 'Ticket index API threshold exceeded'
        },
        headers: {
          ['retry-after']: 35
        }
      },
      authenticationError: {
        status: 401,
        message: 'Could not authenticate you',
        data: { error: 'Couldn\'t authenticate you' }
      }
    }[errorType];
    const e = new Error(errorData?.message || '');
    e.response = {
      status: errorData?.status || 500,
      data: errorData?.data || {},
      headers: errorData?.headers || {}
    };
    return e;
  };

  async get(url, { params, auth }) {
    if (this.error) {
      throw this.errorResponse(this.error);
    }
    return this.successResponse(url);
  };

}