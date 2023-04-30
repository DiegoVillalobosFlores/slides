// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import RedisInstance from "@/clients/redis";
import RedisStreamsService from "@/services/redis/streams";
import {memoryUsage} from 'node:process'

const client = await RedisInstance('BLOCKING');
const redisStreamService = RedisStreamsService(client)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {streams} = await JSON.parse(req.body);
  
  console.log(memoryUsage())
  
  const result = await redisStreamService.readBlockingStream(streams)

  return res.status(200).json({result})
}
