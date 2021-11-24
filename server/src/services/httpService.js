import axios from "axios";

export default class HTTPService {
  constructor (client = axios) {
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
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      // } else if (error.request) {
      //   console.log(error.request);
      // } else {
      //   console.log('Error', error.message);
      // }
      throw error;
    }
  }
}