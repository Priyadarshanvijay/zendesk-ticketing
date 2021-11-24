import React, { useEffect, useState } from "react";
import { Segment, Image, Button, TextArea, Card, CardContent, Grid, GridColumn, CardMeta } from "semantic-ui-react";
import TicketDetailedView from "./ticketDetailed";

const Ticket = ({ ticketDetails } = {}) => {
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    setTicket(ticketDetails);
  }, []);

  if (!Object.keys(ticketDetails).length) return <Button>Hello</Button>;

  return (
    <Segment basic padded raised>
      <Card onClick={() => console.log('bennie and the jets')} fluid>
      <CardContent>
      <Image floated='right' size='tiny' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Zendesk_logo.svg/1200px-Zendesk_logo.svg.png'/>
      <Card.Header>
        {ticketDetails.subject}
      </Card.Header>
      <Card.Meta>
        <span className='date'>{(new Date(ticketDetails.created_at)).toLocaleString()}</span>
      </Card.Meta>
      <Card.Description>
        Priority: {ticketDetails.priority || 'unspecified'}
      </Card.Description>
      </CardContent>
      <CardContent extra>
      <TicketDetailedView />
      </CardContent>
      </Card>
    </Segment>
  );
};

export default Ticket;