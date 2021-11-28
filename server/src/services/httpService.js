export default class HTTPService {
  constructor (client) {
    this.client = client;
  }

  static IntegrateRateLimit(response) {
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
      //   console.log("erd", error.response.data);
      //   console.log("ers", error.response.status);
      //   console.log(error.response.headers['retry-after'])
      // } else if (error.request) {
      //   console.log("er", error.request);
      // } else {
      //   console.log('Error', error.message);
      // }
      throw error;
    }
  }
}