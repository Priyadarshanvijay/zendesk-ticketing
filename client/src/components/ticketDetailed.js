import React, { createRef } from 'react'
import { Grid, Header, Segment, Feed, Divider, Label } from 'semantic-ui-react'

function TicketDetailedView({ ticket, requester, assignee }) {

  if (Object.keys(ticket || {}).length === 0) {
    return <></>
  }

  return (
    <Segment basic fluid>
      <Header>
        {ticket.subject}
      </Header>
      <Divider />
      <Header style={{ fontSize: '1em' }}>
        Description: </Header>
      {ticket.description}
      <Grid style={{ marginTop: '3em' }} columns='2'>
        <Grid.Column>
          <Feed>
        <Header style={{ fontSize: '1em' }}>
          Assignee </Header>
          <Divider />
        <Feed.Event>
          {assignee.profilePhoto && <Feed.Label image={assignee.profilePhoto} />}
          <Feed.Content>
            <Feed.Summary>
              {assignee.name}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        </Feed>
        </Grid.Column>
        {/* <Grid.Column /> */}
      <Grid.Column>
      <Feed>
        <Header style={{ fontSize: '1em' }}>
          Requester </Header>
          <Divider />
        <Feed.Event>
          {requester.profilePhoto && <Feed.Label image={requester.profilePhoto} />}
          <Feed.Content>
            <Feed.Summary>
              {requester.name}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
      </Grid.Column>
      </Grid>
      <Segment basic>
      {ticket.tags?.map((tag) => <Label size='mini' color='teal' tag>{tag}</Label>)}
      </Segment>
    </Segment>
  )
}

export default TicketDetailedView;
