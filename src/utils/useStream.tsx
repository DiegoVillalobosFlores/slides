import {useEffect, useState} from "react";

type Message = {
  id: string;
  message: any
}

type StreamResponse = {
  name: string;
  messages: Array<Message>
}

type Streams = Record<string, string>

export default function useStream(keys: Array<string>, end = false) {
  const [responses, setResponses] = useState<Record<string, any>>(keys.reduce((acc, key) => ({...acc, [key]: null}),{}));
  const [isWaiting, setIsWaiting] = useState(false);
  const [streams, setStreams] = useState<Streams>(keys.reduce((acc, key) => ({...acc, [key]: '$'}),{}))
  const [errorCount, setErrorCount] = useState(0);
  const [callerId, setCallerId] = useState('')

  const getData = () => {
    setIsWaiting(true)
    fetch(`/api/streams/read`, {
      method: 'POST',
      body: JSON.stringify({
        streams: Object.entries(streams).map(([key, lastId]) => ({key, id: lastId})),
        callerId
      })})
      .then(res => res.json() as unknown as {result: Array<StreamResponse>, callerId: string})
      .then(({result, callerId} )=> {
        setCallerId(callerId)
        setStreams(result.reduce((acc, {name, messages}) => ({...acc,[name]: messages[0].id}),streams))
        setResponses(result.reduce((acc, {name, messages}) => ({...acc,[name]: messages[0].message}),responses))
      })
      .catch(() => {
        console.log('got error')
        setIsWaiting(false)
        setErrorCount(prevCount => prevCount + 1)
      })
      .finally(() => {
        setIsWaiting(false)
      })
  }

  useEffect(() => {
    if(isWaiting || errorCount > 2 || end) return;
    getData()
  }, [isWaiting, end, errorCount])

  return responses
}