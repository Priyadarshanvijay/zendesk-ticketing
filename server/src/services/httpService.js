export default class HTTPService {
  constructor (client) {
    this.client = client;
  }

  static IntegrateRateLimit(response) {
    // Integrate rate limit remaining from headers into the main body
    // TODO: use the remaining rate limit to warn user when only 5% of
    // total requests are remaining for the current time period.
    return {
      ...response.data,
      rateLimit: response.headers['x-rate-limit'],
      rateLimitRemaining: response.headers['x-rate-limit-remaining']
    }
  }

  async GetRequest({ url = '', auth = {}, queryParams = {} } = {}) {
    try {
      const response = await this.client.get(url, { params: queryParams, auth });
      const data = this.constructor.IntegrateRateLimit(response);
      return data;
    } catch (error) {
      // if (error.response) {
        // Error from zendesk server, request was successful
      //   console.log("erd", error.response.data);
      //   console.log("ers", error.response.status);
      //   console.log(error.response.headers['retry-after'])
      // } else if (error.request) {
        // Request was unsuccessful
      //   console.log("er", error.request);
      // } else {
        // Something else happened
      //   console.log('Error', error.message);
      // }
      throw error;
    }
  }
}