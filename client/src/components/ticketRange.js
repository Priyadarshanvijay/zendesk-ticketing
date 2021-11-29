import { Header } from "semantic-ui-react";

export default ({
  curPage = 1, paginationOffset = 0, totalTickets = 0
} = {}) => {
  const lowerBound = Math.max(
    ((((curPage - 1) + (paginationOffset * 4)) * 25) + 1),
    0
  );
  const upperBound = Math.min(
    ((curPage + (paginationOffset * 4)) * 25),
    totalTickets
  );
  return (
    <Header>
      Showing {lowerBound} - {upperBound} out of {totalTickets} tickets.
    </Header>
  )
};