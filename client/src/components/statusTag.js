import React, { useEffect, useState } from "react";
import { Label, Header } from "semantic-ui-react";


const StatusTag = ({ status, detailed = false } = {}) => {
  const colorMapping = {
    "new": 'blue', 
    "open": 'green', 
    "pending": 'yellow', 
    "hold": 'red', 
    "solved": 'grey', 
    "closed": 'teal',
    'Not Defined': 'orange'
  };

  if (!detailed) {
    return (
      <Label ribbon={'right'} size='mini' color={colorMapping[status]} tag>
        <Header as='h5'>{status}</Header>
      </Label>
    );
  }

  return (
    <Label size={'mini'} color={colorMapping[status]} tag>
      <Header as='h5'>{status}</Header>
    </Label>
  );
};

export default StatusTag;