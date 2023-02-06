// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import RedisInstance from "@/clients/redis";
import RedisTextService from "@/services/redis/text";

const redis = await RedisInstance();
const textService = RedisTextService(redis)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {slideId} = req.query as {slideId: string};
  const {text} = await JSON.parse(req.body);
  const result = await textService.saveText(slideId, text)

  // @ts-ignore
  return res.status(200).json({id: result})
}
