import React from "react";
import { Pagination} from "semantic-ui-react";

const PaginationBar = ({ tickets = [] } = {}) => {

  if (!tickets.length) return <div>Loading Tickets</div>;

  return (
    <Pagination
    defaultActivePage={1}
    firstItem={null}
    lastItem={null}
    pointing
    totalPages={(tickets || []).length}
    fixed={'bottom'}
  />
  );
};

export default PaginationBar;