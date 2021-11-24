
import APIutils from './utils';

const getTicketCount = () => {
  const endpoint = 'api/ticketCount';
  return APIutils.fetchWithCache(endpoint);
}

const getTickets = ({
  afterCursor = true, cursor = '', pageSize = 25
} = {}) => {
  let endPoint = `api/listTickets?size=${pageSize}`;
  if (cursor && afterCursor) {
    endPoint += `after=${cursor}`;
  } else if (cursor && !afterCursor) {
    endPoint += `before=${cursor}`;
  }
  return APIutils.fetchWithCache(endPoint);
}

export default {
  getTicketCount,
  getTickets
};
