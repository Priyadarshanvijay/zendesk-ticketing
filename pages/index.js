import { useEffect, useState } from 'react';
import Serverless from './api/index';

export default function Home() {

  const [tickets, setTickets] = useState({ data: undefined, error: undefined });

  useEffect(() => {
    const t = Serverless.getTickets();
    setTickets(t);
  }, [])
  
  const TicketCount = Serverless.getTicketCount();

  if (TicketCount.error) return <div>failed to load {TicketCount.error.status} {TicketCount.error.info}</div>
  if (!TicketCount.data) return <div>loading...</div>
  if (tickets.data) console.log(tickets.data)
  return (
    <div>No Of Tickets =  {TicketCount.data?.count?.value}</div>
  )
}
