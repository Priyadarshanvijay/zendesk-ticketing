import chai from 'chai';
import HTTPService from '../src/services/httpService.js';
import ZendeskService from '../src/services/zendesk.js';
import TicketService from '../src/services/tickets.js';
import MockClient from './mocks/client.js';
import UserUtils from '../src/utils/userUtils.js';

const { expect } = chai;

describe('TicketService', function() {
  describe('Tickets', function() {
    const mockSuccessClient = new MockClient();
    const successHTTPService = new HTTPService(mockSuccessClient);
    const zendeskService = new ZendeskService({ httpService: successHTTPService });
    const ticketService = new TicketService({ zendeskService });
    it('Should give correct response of list tickets api with remaining rate limit and users object', async () => {
      const url = '/tickets';
      const result = await ticketService.getTickets();
      const expectedOutput = {
        ...(mockSuccessClient.successResponse(url)?.data || {}),
        rateLimit: 400,
        rateLimitRemaining: 399,
        users: UserUtils.mapUserData((mockSuccessClient.successResponse(url)?.data || {}).users || [])
      };
      expect(result).to.eql(expectedOutput);
    });
  });
});
