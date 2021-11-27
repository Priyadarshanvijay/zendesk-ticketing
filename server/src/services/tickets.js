import ArrayUtils from "../utils/arrayUtils.js";

export default class TicketService {
  constructor({ zendeskService } = {}) {
    this.zendeskService = zendeskService
  }

  getFirstThis() {
    return this;
  }

  getTicketCount() {
    return this.zendeskService.getTicketCount();
  }

  static extractUserData = ({ users = [] } = {}) => users.reduce((prevUsers, curUser) => ({
    ...prevUsers,
    [curUser.id]: {
      name: curUser.name,
      email: curUser.email,
      profilePhoto: curUser.photo?.content_url
    }
  }), Object.create(null));

  // Had to do it "this" way to tackle around the problem with scope of "this" :P
  appendUserInfo = async (ticketsBody) => {
    const { tickets } = ticketsBody;
    const userIds = new Set();
    tickets.forEach(({ requester_id, submitter_id, assignee_id }) => {
      userIds.add(requester_id).add(submitter_id).add(assignee_id);
    });
    const maxUsersRetrievable = 100;
    const uniqueUserIdChunks = ArrayUtils.arrayChunks([...userIds], maxUsersRetrievable);
    const currentClass = this.getFirstThis();
    return Promise.all(uniqueUserIdChunks.map(
      (ids) => currentClass.getUsersFromArray(ids).then(currentClass.constructor.extractUserData)
    ))
    .then((array) => array.reduce((prev, cur) => ({ ...prev, ...cur })))
    .then((userObject) => ({ users: userObject, ...ticketsBody }));
  }

  getTickets({ before, after }) {
    return this.zendeskService.listTickets({ before, after })
      .then(this.appendUserInfo);
  }

  getUsersFromArray(ids = []) {
    return this.zendeskService.listUsers({ ids: ids.join(',') });
  }

  getUsers({ ids }) {
    return this.zendeskService.listUsers({ ids });
  }
}