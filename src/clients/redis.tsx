import {createClient} from "redis";

const client = createClient({
  url: process.env.REDIS_CONNECTION_URL, name: 'SLIDES-DEFAULT'
});

client.on('error', err => console.log('Redis Client Error', err));

export type RedisClient = Awaited<ReturnType<typeof RedisInstance>>;

export default async function RedisInstance(name?: string) {
  if(name) {
    const blockingClient = createClient({
      url: process.env.REDIS_CONNECTION_URL, name
    })

    await blockingClient.connect();
    return blockingClient
  }
  if(client.isOpen) return client

  await client.connect();
  return client
}
