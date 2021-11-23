import useSWR from 'swr'
import FetchUtils from './api/utils';


export default function Home() {
  const { data, error } = useSWR('api/ticketCount', FetchUtils.fetcher);

  if (error) return <div>failed to load {error.status} {error.info}</div>
  if (!data) return <div>loading...</div>
  return (
    <div>No Of Tickets =  {data?.count?.value}</div>
  )
}
