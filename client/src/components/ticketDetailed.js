import React from 'react'
import { Grid, Header, Segment, Feed, Divider, Label, GridColumn } from 'semantic-ui-react'
import StatusTag from './statusTag';

function TicketDetailedView({ ticket, requester, assignee }) {

  if (Object.keys(ticket || {}).length === 0) {
    return <></>
  }

  return (
    <Segment basic fluid>
      <Header>
        <Grid columns='2'>
          <Grid.Column stretched>
            {ticket.subject}
          </Grid.Column>
          <Grid.Column>
            <StatusTag status={ticket.status} detailed={true} />
            <Header as='h5' floated='right'>{ticket.priority || 'normal'}</Header>
          </Grid.Column>
        </Grid>
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
