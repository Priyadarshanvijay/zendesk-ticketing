import useSWR from 'swr';

const requestOptions = (method = '') => () => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;
  const authHeader = `Basic ` + Buffer.from(`${username}:${password}`).toString('base64');
  return {
    method,
    headers: {
      Authorization: authHeader
    }
  };
};

const getRequestOptions = requestOptions('GET');

const appendRateLimitingHeaders = (data) => data.json().then((dataInJSON) => ({
  ...dataInJSON,
  rateLimit: +data.headers.get('x-rate-limit'),
  rateLimitRemaining: +data.headers.get('x-rate-limit-remaining')
}));

const getWithAuth = async (endpoint = '', fetchFunction = fetch) => {
  const baseURL = process.env.BASE_URL || 'https://zccpriyadarshan.zendesk.com/';
  const encodedEndpoint = encodeURI(endpoint);
  const data = await fetchFunction(`${baseURL}${encodedEndpoint}`, getRequestOptions());
  if (!data.ok) {
    const error = new Error('Zendesk API Error');
    error.info = data.statusText;
    error.status = data.status || 500;
    throw error;
  }
  const dataInJson = appendRateLimitingHeaders(data);
  return dataInJson;
};

const retryConfigs = { revalidateOnFocus: false, shouldRetryOnError: false };

const fetcher = async (url, fetchFunction = fetch) => {
  const res = await fetchFunction(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = (await res.json()).info || 'Unknown Error!';
    error.status = res.status
    throw error
  }
  return res.json()
};

const fetchWithCache = (api, fetchFunction = fetcher, config = retryConfigs) => useSWR(api, fetchFunction, config);

export default {
  getWithAuth,
  retryConfigs,
  fetchWithCache
};
