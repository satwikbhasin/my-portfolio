import { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { allProjects } from "contentlayer/generated";

const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const views = (
      await redis.mget<number[]>(
        ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"))
      )
    ).reduce((acc, v, i) => {
      acc[allProjects[i].slug] = v ?? 0;
      return acc;
    }, {} as Record<string, number>);

    res.status(200).json(views);
  } catch (error) {
    console.error('Error fetching view counts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}