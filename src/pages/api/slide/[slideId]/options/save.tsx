// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import RedisOptionsService from "@/services/redis/options";
import RedisInstance from "@/clients/redis";

type Data = {
  id: string
}

const redis = await RedisInstance();
const OptionsService = RedisOptionsService(redis)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {slideId} = req.query as {slideId: string};
  const {options} = await JSON.parse(req.body);
  const result = await OptionsService.createOptions(slideId, options)

  // @ts-ignore
  return res.status(200).json({id: result})
}
