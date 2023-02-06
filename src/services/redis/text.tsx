import {RedisClient} from "@/clients/redis";
import shortenKeys from "@/utils/shortenKeys";

const TEXT_PREFIX = 'TEXT';

const keys = {
  text: (id: string) => `${TEXT_PREFIX}:${id}:STRING`,
  stream: (id: string) => `${TEXT_PREFIX}:${id}:STREAM`
}

export const k = shortenKeys(keys)

export default function RedisTextService(redis: RedisClient) {
  return {
    saveText: async (id: string, text: string) => {
      const result = await redis.append(k.t(id), text)
      redis.xAdd(k.s(id), '*', {text})

      return result
    }
  }
}