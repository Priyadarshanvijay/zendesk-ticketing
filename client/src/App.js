import { useEffect, useState } from 'react';
import TicketService from './services/ticketService';
import Ticket from './components/ticket';
import { Container, Segment, SegmentGroup } from 'semantic-ui-react';

function App() {
  const ticketService = new TicketService();
  const [tickets, setTickets] = useState([]);
  const [loadedTickets, setLoadedTickets] = useState(false);
  useEffect(() => {
    ticketService.getTickets().then(appendTickets).then(() => setLoadedTickets(true));
  }, []);

  const appendTickets = (data) => {
    setTickets((prev = []) => {
      return [...prev, ...data.tickets]
    });
  }
  
  if (!loadedTickets) {
    return (
      <Container loading={true} style={{ marginTop: '3em' }}>
        <Segment size='massive' padded loading />
      </Container>
    )
  }

  return (
    <Container loading={true} style={{ marginTop: '3em' }}>
      <SegmentGroup>
        {(tickets || []).map((ticket) => (<Ticket key={ticket.id} ticketDetails={ticket}></Ticket>))}
      </SegmentGroup>
    </Container>
  );
}

export default App;
