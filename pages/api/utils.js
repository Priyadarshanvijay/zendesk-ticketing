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

const getWithAuth = async (endpoint = 'api/v2/tickets/count') => {
  const baseURL = process.env.BASE_URL || 'https://zccpriyadarshan.zendesk.com/';
  const data = await fetch(`${baseURL}${endpoint}`, getRequestOptions());
  if (!data.ok) {
    console.log("Zendesk API returned error: ", data.status, data.statusText);
    const error = new Error('Zendesk API Error');
    error.info = data.statusText;
    error.status = data.status || 500;
    throw error;
  }
  const dataInJson = appendRateLimitingHeaders(data);
  return dataInJson;
};

// const retryConfigs = {
//   onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
//     if (retryCount >= 10) return;

//     if(error.status === 429) {
//       // Retry after 1 Minute.
//       console.log("hahahahahahah")
//       setTimeout(() => revalidate({ retryCount }), 60000);
//       return;
//     }

//     return;
//   }
// }

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = (await res.json()).info || 'Unknown Error!';
    error.status = res.status
    throw error
  }
  return res.json()
};

export default {
  getWithAuth,
  fetcher
};
