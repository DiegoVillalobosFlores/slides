import {RedisClient} from "@/clients/redis";
import Options from "@/types/Options";
import { z } from "zod"

const OPTIONS_SUFFIX = 'OPTIONS';

export const keys = {
  domain: OPTIONS_SUFFIX,
  set: `${OPTIONS_SUFFIX}:SET`,
  options: (id:string) => `${OPTIONS_SUFFIX}:${id}:JSON`,
  stream: (id:string) => `${OPTIONS_SUFFIX}:${id}:STREAM`
}

const numberRegex = /\d/

export const OptionsSchema = z.object({
  color: z.enum(['violet', 'red', 'teal', 'blue']),
  font: z.enum(['eczar', 'karla', 'andada']),
  alignment: z.enum(['top', 'center', 'bottom']),
  position: z.enum(['left', 'center', 'right']),
  height: z.string().regex(numberRegex),
  width: z.string().regex(numberRegex)
}).default({
  color: 'violet',
  font: 'eczar',
  alignment: 'top',
  position: 'left',
  height: '62',
  width: '375'
})

export default function RedisOptionsService(redis: RedisClient) {
  return {
    createOptions: async (id: string, options: Options) => {
      OptionsSchema.parse(options)



      const result = await redis.json.set(keys.options(id), '$', options)
      redis.xAdd(keys.stream(id), '*', options)

      return result
    },
    getOptions: (id: string) => {
      return redis.json.get(keys.options(id)) as unknown as Options
    },

  }
}