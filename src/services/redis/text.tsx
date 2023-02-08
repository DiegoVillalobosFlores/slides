import {RedisClient} from "@/clients/redis";

const TEXT_PREFIX = 'TEXT';

export const keys = {
  text: (id: string) => `${TEXT_PREFIX}:${id}:STRING`,
  stream: (id: string) => `${TEXT_PREFIX}:${id}:STREAM`
}

export default function RedisTextService(redis: RedisClient) {
  return {
    saveText: async (id: string, text: string) => {
      const result = await redis.set(keys.text(id), text)
      redis.xAdd(keys.stream(id), '*', {text}, {TRIM: {
        strategy: 'MAXLEN',
          threshold: 10
        }})

      return result
    }
  }
}