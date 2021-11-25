import React, { createRef } from 'react';
import TicketService from './services/ticketService';
import Ticket from './components/ticket';
import { Container, GridColumn, Grid, Segment, Sticky } from 'semantic-ui-react';
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
  const [isSelected, setisSelected] = useState(null);
  useEffect(() => {
    ticketService.getTickets()
    .then(appendTickets)
    .then(appendUsers)
    .then(setLoadedTickets);
  }, []);

  const contextRef = createRef();

  const appendTickets = (data) => {
    setTickets((prev = []) => {
      const chunksOfTwentyFive = ArrayUtils.arrayChunks(25)(data.tickets);
      return [...prev, ...chunksOfTwentyFive];
    });
    return data;
  };

  const appendUsers = (data) => {
    setUsers((prev = {}) => ({ ...prev, ...(data?.users || {}) }));
    return true;
  }
  
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
    <Container fluid style={{ height: "100%", paddingTop: '7em', paddingBottom: '4em' }}>
    <Grid columns='2' style={{ height:'100%' }} stackable>
      <GridColumn style={{ height: "100%", overflow: "auto", paddingTop: '0em' }}>
        <Segment basic>
          {(tickets?.[1] || []).map((ticket) => (<Ticket 
          selected={isSelected === ticket.id} onChange = {() => setisSelected(ticket.id)} key={ticket.id} ticketDetails={ticket}></Ticket>))}
        </Segment>
      </GridColumn>
      <GridColumn style={{ height: "100%" }}>
        <TicketDetailedView />
      </GridColumn>
    </Grid>
    </Container>
    <PaginationBar tickets={(tickets|| [])}/>
    </>
  );
}

export default App;
