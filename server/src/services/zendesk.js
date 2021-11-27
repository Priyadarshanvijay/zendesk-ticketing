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
  }

  async listTickets({ pageSize = 100, before = '', after = '' } = {}) {
    if (before && after) throw new Error('Cannot take as input both next and previous pointer');
    const listTicketEndpoint = this.zendeskURL + '/tickets';
    const queryParams = JSON.parse(JSON.stringify({
      'page[size]': pageSize,
      'page[after]': after,
      'page[before]': before
    }));
    return this.httpService.GetRequest({ url: listTicketEndpoint, auth: this.auth, queryParams });
  }

  async listUsers({ ids }) {
    const listUsersEndpoint = this.zendeskURL + '/users/show_many';
    const queryParams = JSON.parse(JSON.stringify({
      ids
    }));
    return this.httpService.GetRequest({ url: listUsersEndpoint, auth: this.auth, queryParams });
  }

}