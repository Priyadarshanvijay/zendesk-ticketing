import React from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,
} from 'semantic-ui-react';

const menuBar = () => (
  <Menu borderless color='teal' inverted fixed={'top'}>
    <Container fluid>
      <Menu.Item  header>
        <Image size='mini' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Zendesk_logo.svg/1200px-Zendesk_logo.svg.png' style={{ marginRight: '1.5em' }} />
      </Menu.Item>
    </Container>
  </Menu>
);

export default menuBar;
