import React from "react";
import { Menu } from "semantic-ui-react";

const PaginationBar = ({
  tickets = [], paginationOffset = 0, activePage = 1, setPage, hasNextItem = true, hasPrevItem = true,
  loadTickets
} = {}) => {

  if (!tickets.length) return <div>Loading Tickets</div>;

  const handlePaginationChange = (e, obj) => {
    setPage((prev) => +obj.name)
  };

  const calculatePageNumber = (offset = 0, index = 0) => ((offset * 4) + index + 1);

  return (
    <Menu fixed={'bottom'} borderless>
      <Menu.Item name={'prev'} onClick={loadTickets(true)} disabled={!hasPrevItem}>«</Menu.Item>
      {(tickets || []).map((_, index) => {
        return (
          <Menu.Item
          key = {index + 1}
          name={String(index + 1)}
          active={activePage === (index + 1)}
          onClick={handlePaginationChange}
        >{calculatePageNumber(paginationOffset, index)}</Menu.Item>
        )
      })}
      <Menu.Item name={'next'} onClick={loadTickets(false)} disabled={!hasNextItem}>»</Menu.Item>
    </Menu>
  );
};

export default PaginationBar;