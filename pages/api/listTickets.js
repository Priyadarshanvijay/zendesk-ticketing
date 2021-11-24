import APIUtils from './utils';

const returnResolve = () => new Promise((resolve) => resolve());

export default function handler(req, res) {
  const endpoint = 'api/v2/tickets';
  const { params } = req;
  console.log(params);
  // -updated_at
  return APIUtils.getWithAuth(endpoint).then((data) => {
    res.status(200).json(data);
    returnResolve();
  }).catch((e) => {
    res.status(e.status || 500).json({ info: e.info });
    returnResolve();
  });
}
