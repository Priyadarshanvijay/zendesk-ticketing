import HTTPService from "./httpService";

export default class TicketService {
  constructor ({ httpService = HTTPService, baseURL = process.env.REACT_APP_BASE_URL } = {}) {
    this.baseURL = baseURL;
    this.httpService = new httpService();
  }

  getTickets ({ after = '', before = '' } = {}) {
    if (before && after) throw new Error('Cannot send both before and after cursor to the request.');
    const queryParams = JSON.parse(JSON.stringify({
      after: after || undefined,
      before: before || undefined
    }));
    const url = this.baseURL + '/tickets';
    return this.httpService.GetRequest({ url, queryParams });
  }

  getTicketCount () {
    const url = this.baseURL + '/tickets/count';
    return this.httpService.GetRequest({ url })
    .then(({ ticketCount }) => +ticketCount || 0);
  }

}