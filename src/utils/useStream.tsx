import {useCallback, useEffect, useState} from "react";

type Message<T> = {
  id: string;
  message: T
}

type StreamResponse<k extends string, T> = {
  name: k;
  messages: Array<Message<T>>
}

type StreamMessages = Record<string, string>

type StreamHandlers<T extends [string, (arg: any) => void]> = Record<string, (result: Parameters<T[1]>[0]) => void>

export default function useStream<T extends [string, (arg: any) => void]>(
  handlers: StreamHandlers<T>,
  stopStreaming = false,
  url = '/api/streams/read'
) {

  const [isWaiting, setIsWaiting] = useState(false);
  const [streams, setStreams] = useState<StreamMessages>(
    Object.keys(handlers).reduce((acc, key) => ({...acc, [key]: '$'}),{})
  )
  const [errorCount, setErrorCount] = useState(0);
  const [callerId, setCallerId] = useState('')

  const getData = useCallback(() => {
    setIsWaiting(true)
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        streams: Object.entries(streams).map(([key, lastId]) => ({key, id: lastId})),
        callerId
      })})
      .then(res => res.json() as unknown as {
        result: Array<StreamResponse<keyof typeof handlers, Parameters<typeof handlers[keyof typeof handlers]>[0]>>,
        callerId: string
      })
      .then(({result, callerId} )=> {
        setCallerId(callerId)
        for(const streamResult of result) {
          handlers[streamResult.name](streamResult.messages[0].message)
          setStreams(prevStreams => ({...prevStreams, [streamResult.name]: streamResult.messages[0].id}))
        }
      })
      .catch(() => {
        console.log('got error')
        setIsWaiting(false)
        setErrorCount(prevCount => prevCount + 1)
      })
      .finally(() => {
        setIsWaiting(false)
      })
  }, [callerId, handlers, streams, url])

  useEffect(() => {
    if(
      isWaiting ||
      errorCount > 2 ||
      stopStreaming
    ) return;
    getData()
  }, [isWaiting, stopStreaming, errorCount, getData])
}