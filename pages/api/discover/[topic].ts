import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { topic } = req.query;
    if (!topic) {
      res.status(400).json({ error: "Something went wrong" });
    }
    const post = await prisma.post.findMany({
      where: {
        topic: topic,
      },
      include: {
        user: true,
        comment: true,
        likes: true,
      },
    });
    if (!post) {
      res.status(400).json({ error: "No post with that id" });
    }
    res.status(200).json(post);
    res.end();
  }
}
