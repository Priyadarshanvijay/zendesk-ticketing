import APIUtils from './utils';

const returnResolve = () => new Promise((resolve) => resolve());

export default function handler(req, res) {
  return APIUtils.getWithAuth('api/v2/tickets/count').then((data) => {
    res.status(200).json(data);
    returnResolve();
  }).catch((e) => {
    res.status(e.status || 500).json({ info: e.info });
    returnResolve();
  });
}
