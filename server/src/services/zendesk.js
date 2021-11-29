export default class ZendeskService {
  constructor ({
    zendeskURL = '', zendeskUsername = '', zendeskPassword = '', httpService
  } = {}) {
    this.zendeskURL = zendeskURL;
    this.auth = {
      username: zendeskUsername,
      password: zendeskPassword
    };
    this.httpService = httpService
  }

  async getTicketCount() {
    const ticketCountEndpoint = this.zendeskURL + '/tickets/count';
    
    return this.httpService.GetRequest({ url: ticketCountEndpoint, auth: this.auth })
      .then(({ count }) => count?.value);
  };

  async listTickets({ pageSize = 100, before = '', after = '' } = {}) {
    if (before && after) throw new Error('Cannot take as input both next and previous pointer');
    const listTicketEndpoint = this.zendeskURL + '/tickets';
    // After this, queryParams will contain only one of page[after] or
    // page[before] as a key because JSON.parse after JSON.stringify will
    // remove keys with values as undefined.
    // Also, instead of doing additional user request for retriving data of users,
    // we can simply use the include parameter supported by the api to return
    // related data
    const queryParams = JSON.parse(JSON.stringify({
      'page[size]': pageSize,
      'page[after]': after || undefined,
      'page[before]': before || undefined,
      include: 'users'
    }));
    return this.httpService.GetRequest({ url: listTicketEndpoint, auth: this.auth, queryParams });
  };

};
