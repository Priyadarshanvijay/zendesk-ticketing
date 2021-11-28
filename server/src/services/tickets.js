import UserUtils from "../utils/userUtils.js";
export default class TicketService {
  constructor({ zendeskService } = {}) {
    this.zendeskService = zendeskService
  }

  getTicketCount() {
    return this.zendeskService.getTicketCount();
  }

  getTickets({ before, after } = {}) {
    return this.zendeskService.listTickets({ before, after })
      .then(UserUtils.appendUserInfo);
  }
}