import {RedisClient} from "@/clients/redis";
import {z} from 'zod'

// matches 1675634104822-0 and $ ids
const streamIdRegex = /(\d{13}-\d)|\$/

const StreamsSchema = z.array(z.object(
  {
    key: z.string(),
    id: z.string().regex(streamIdRegex)
  }
))

export default function RedisStreamsService(redis: RedisClient) {
  return {
    readBlockingStream: (streams: Array<{key: string, id: string}>) => {
      StreamsSchema.parse(streams)
      const options = {
        BLOCK: 60 * 1000
      };

      return  redis.xRead(streams, options)
    }
  }
}