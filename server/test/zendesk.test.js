import chai from 'chai';
import HTTPService from '../src/services/httpService.js';
import ZendeskService from '../src/services/zendesk.js';
import MockClient from './mocks/client.js';

const { expect } = chai;

describe('ZendeskService', function() {
  describe('Ticket Count', function() {
    const mockSuccessClient = new MockClient();
    const successHTTPService = new HTTPService(mockSuccessClient);
    const zendeskService = new ZendeskService({ httpService: successHTTPService });
    it('Should return a number', async () => {
      const result = await zendeskService.getTicketCount();
      expect(result).to.be.a('number');
    });
    it('Should return 102', async () => {
      const result = await zendeskService.getTicketCount();
      expect(result).to.be.equal(102);
    })
  });

  describe('Tickets', function() {
    const mockSuccessClient = new MockClient();
    const successHTTPService = new HTTPService(mockSuccessClient);
    const zendeskService = new ZendeskService({ httpService: successHTTPService });
    it('Should throw error', async () => {
      try {
        await zendeskService.listTickets({ before: 'something', after: 'something' });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e.message).to.be.equal('Cannot take as input both next and previous pointer');
      }
    });
  });
});
