import chai from 'chai';
import HTTPService from '../src/services/httpService.js';
import MockClient from './mocks/client.js';

const { expect } = chai;

describe('HTTPService', function() {
  describe('Success Response', function() {
    const mockSuccessClient = new MockClient();
    const successHTTPService = new HTTPService(mockSuccessClient);
    it('Should give correct response of list tickets api with remaining rate limit', async () => {
      const url = '/tickets';
      const result = await successHTTPService.GetRequest({ url });
      const expectedOutput = {
        ...(mockSuccessClient.successResponse(url)?.data || {}),
        rateLimit: 400,
        rateLimitRemaining: 399
      };
      expect(result).to.eql(expectedOutput);
    });
  });

  describe('Too Many Requests', function() {
    const mockFailureClient = new MockClient('rateLimitError');
    const failureHTTPService = new HTTPService(mockFailureClient);
    const url = '/tickets';
    let error = undefined;
    it('Should throw error', async () => {
      try {
        await failureHTTPService.GetRequest({ url });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        error = e;
      }
    });
    it('Should contain message as too many requests', () => {
      expect(error.message).to.be.equal('Too many requests');
    });
    it('Should have status as 429', () => {
      expect(error.response?.status).to.be.equal(429);
    });
    it('Should have a retry-after header with value as 35', () => {
      expect(error.response.headers['retry-after']).to.be.equal(35);
    });
  });

  describe('Authentication Error', function() {
    const mockFailureClient = new MockClient('authenticationError');
    const failureHTTPService = new HTTPService(mockFailureClient);
    const url = '/tickets';
    let error = undefined;
    it('Should throw error', async () => {
      try {
        await failureHTTPService.GetRequest({ url });
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        error = e;
      }
    });
    it('Should contain message as Could not authenticate you', () => {
      expect(error.message).to.be.equal('Could not authenticate you');
    });
    it('Should have status as 401', () => {
      expect(error.response?.status).to.be.equal(401);
    });
  });
});
