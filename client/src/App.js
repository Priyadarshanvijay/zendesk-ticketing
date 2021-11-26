import React from 'react';
import TicketService from './services/ticketService';
import Ticket from './components/ticket';
import { Container, GridColumn, Grid, Segment } from 'semantic-ui-react';
import TopMenubar from './components/topMenubar';
import ArrayUtils from './utils/arrayutils';
import PaginationBar from './components/paginationBar';
import TicketDetailedView from './components/ticketDetailed';
import '../src/style.css';

const { useState, useEffect } = React;

function App() {
  const ticketService = new TicketService();
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState({});
  const [loadedTickets, setLoadedTickets] = useState(false);
  const [isSelected, setIsSelected] = useState(NaN);
  const [requester, setRequester] = useState({});
  const [assignee, setAssignee] = useState({});
  const [selectedTicket, setSelectedTicket] = useState({});
  const [curPage, setCurPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [hasLess, setHasLess] = useState(false);
  const [prevCursor, setPrevCursor] = useState('');
  const [nextCursor, setNextCursor] = useState('');
  const [paginationOffset, setPaginationOffset] = useState(0);

  const getCursorToFetch = (isBefore = false) => isBefore ? { before: prevCursor } : { after: nextCursor };

  const changePaginationOffset = (isBefore = false, isFirst = false) => (data) => {
    if (!isFirst) {
      if (isBefore) {
        setPaginationOffset((prev) => (prev - 1));
      } else {
        setPaginationOffset((prev) => (prev + 1));
      }
    }
    return data;
  };

  const updateCursors = (data) => {
    setHasMore(data?.meta?.has_more || false);
    setPrevCursor(data?.meta?.before_cursor);
    setNextCursor(data?.meta?.after_cursor);
    return data;
  }

  const loadTickets = (isBefore = false, isFirst = false) => () => {
    setLoadedTickets(false);
    return ticketService.getTickets(getCursorToFetch(isBefore))
    .then(updateCursors)
    .then(insertTickets)
    .then(appendUsers)
    .then(changePaginationOffset(isBefore, isFirst))
    .then(setLoadedTickets);
  }
  
  useEffect(() => {
    loadTickets(false, true)();
  }, []);

  useEffect(() => {
    setHasLess(paginationOffset > 0);
    resetTicketSelect();
    setCurPage(1);
    console.log("curPage", curPage);
    console.log("isSelected", isSelected)
  }, [paginationOffset])

  const insertTickets = (data) => {
    setTickets(() => {
      const chunksOfTwentyFive = ArrayUtils.arrayChunks(25)(data.tickets);
      return [...chunksOfTwentyFive];
    });
    return data;
  };

  const appendUsers = (data) => {
    setUsers(() => ({ ...(data?.users || {}) }));
    return true;
  };

  const resetTicketSelect = () => {
    setIsSelected(NaN);
    setSelectedTicket((_) => ({}));
    setRequester((_) => ({}));
    setAssignee((_) => ({}));
  }

  const selectTicket = (ticketId) => () => {
    setIsSelected(ticketId);
    const newTicket = tickets?.[(curPage - 1) % 4]?.[ticketId] || {};
    setSelectedTicket(newTicket);
    const newRequester = users[newTicket.requester_id];
    setRequester(newRequester);
    const newAssignee = users[newTicket.assignee_id];
    setAssignee(newAssignee);
  };
  
  if (!loadedTickets) {
    return (
      <>
      <TopMenubar />
      <Container style={{ marginTop: '7em' }}>
        <Segment basic size='massive' padded loading />
      </Container>
      </>
    )
  }

  return (
    <>
    <TopMenubar/>
    <Container fluid style={{ height: '100%', paddingTop: '7em', paddingBottom: '4em' }}>
    <Grid columns='2' style={{ height:'100%' }} stackable>
      <GridColumn style={{ height: '100%', overflow: 'auto', paddingTop: '0em' }}>
        <Segment basic>
          {(tickets?.[(curPage - 1) % 4] || []).map((ticket, index) => (<Ticket 
          selected={isSelected === index} onChange = {selectTicket(index)} key={ticket.id} ticketDetails={ticket}></Ticket>))}
        </Segment>
      </GridColumn>
      <GridColumn style={{ height: '100%' }}>
      {!isNaN(isSelected) &&
        <TicketDetailedView ticket={selectedTicket} requester={requester} assignee={assignee} />
      }
      </GridColumn>
    </Grid>
    </Container>
    <PaginationBar loadTickets={loadTickets} hasNextItem={hasMore} hasPrevItem={hasLess} paginationOffset={paginationOffset} tickets={(tickets|| [])} activePage={curPage} setPage={setCurPage}/>
    </>
  );
}

export default App;
