import axios from "axios";

export default class HTTPService {
  constructor (client = axios) {
    this.client = client;
  }

  async GetRequest({ url = '', queryParams = {} } = {}) {
    try {
      const response = await this.client.get(url, { params: queryParams });
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }
}