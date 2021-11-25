import HTTPService from "./httpService";

export default class TicketService {
  constructor ({ httpService = HTTPService, baseURL = 'http://192.168.1.17:3002' } = {}) {
    this.baseURL = baseURL;
    this.httpService = new httpService();
  }

  getTickets ({ after = '', before = '' } = {}) {
    if (before && after) throw new Error('Cannot send both before and after cursor to the request.');
    const queryParams = JSON.parse(JSON.stringify({
      after,
      before
    }));
    const url = this.baseURL + '/tickets';
    const data = this.httpService.GetRequest({ url, queryParams });
    return data;
  }

}