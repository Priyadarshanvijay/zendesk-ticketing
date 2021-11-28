import React from 'react'
import {
  Segment, Header, Container, Image
} from 'semantic-ui-react';

const errorPlaceholder = ({ error = '' } = {}) => {
  if (error === 'Network Error') {
    return (
      <Container textAlign='center' fluid>
<Image verticalAlign='middle' src='https://res.cloudinary.com/da0m5civo/image/upload/v1638079223/oie_gJH73RO9BHH8_gecmwc.png'></Image>
      </Container>
    )
  }
  if (error === '401') {
    return (
      <Segment placeholder basic textAlign='center'>
        <Header>Couldn't authenticate you!</Header>
      </Segment>
    )
  }
  if (error === '429') {
    return (
      <Segment placeholder basic textAlign='center'>
        <Header>Too many requests, please wait for a minute before retrying</Header>
      </Segment>
    )
  }
  if (error === 'No Tickets') {
    return (
      <Segment placeholder basic textAlign='center'>
        <Header>Bummer!! There are no tickets to display :(</Header>
      </Segment>
    )
  }
  return (
    <Segment placeholder basic textAlign='center'>
      <Header>Some Unknown Error Occured, please try again later.</Header>
    </Segment>
  )
};

export default errorPlaceholder;
