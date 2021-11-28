import React, { useEffect, useState } from "react";
import { Segment, Image, Button, TextArea, Card, CardContent, Header, Grid, GridColumn, CardMeta } from "semantic-ui-react";
import StatusTag from "./statusTag";

const Ticket = ({ ticketDetails, selected, onChange } = {}) => {
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    setTicket(ticketDetails);
  }, []);

  if (!Object.keys(ticketDetails).length) return <></>;

  const styleBorder = {
    borderLeftStyle: 'solid',
    borderColor: 'teal',
    borderWidth: '5px'
  }

  return (
      <Card style={selected ? styleBorder : {}} onClick={onChange} fluid>
      <CardContent>
        <StatusTag status={ticketDetails.status} />
      <Card.Header>
        {ticketDetails.subject}
      </Card.Header>
      <Card.Meta>
        <span className='date'>{(new Date(ticketDetails.created_at)).toLocaleString()}</span>
      </Card.Meta>
      <Card.Description>
        <Header as='h4'>Priority: {ticketDetails.priority || 'normal'}</Header>
      </Card.Description>
      </CardContent>
      </Card>
  );
};

export default Ticket;