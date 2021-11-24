import React from 'react'
import { Button, Header, Image, Modal, ModalActions } from 'semantic-ui-react'

function TicketDetailedView() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button primary>Show Detailed View</Button>}
    >
      <Modal.Header>
        Detailed View
        <Button icon='close' floated='right' color='green' onClick={() => setOpen(false)} />
        {/* </Button> */}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Ticket Subject</Header>
          <p>
            Some Details about the ticket
          </p>
          <p>Comments maybe?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default TicketDetailedView;
