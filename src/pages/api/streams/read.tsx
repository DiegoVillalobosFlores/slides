// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import RedisInstance from "@/clients/redis";
import RedisStreamsService from "@/services/redis/streams";
import * as crypto from "crypto";

const clients = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {streams, callerId} = await JSON.parse(req.body);

  const assignedCallerId = callerId || crypto.randomUUID();
  // @ts-ignore
  if(!clients[assignedCallerId]) {
    // @ts-ignore
    clients[assignedCallerId] = await RedisInstance(assignedCallerId);
  }

  // @ts-ignore
  const redisBlocking = clients[assignedCallerId];

  const redisStreamService = RedisStreamsService(redisBlocking)
  const result = await redisStreamService.readBlockingStream(streams)

  return res.status(200).json({result, callerId: assignedCallerId})
}
