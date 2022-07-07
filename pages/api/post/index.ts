import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get session details

  // HTTP GET METHOD - get all posts
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comment: true,
        likes: true,
        user: true,
      },
    });

    if (posts) {
      res.status(200).json(posts);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.end();
  }

  //HTTP POST METHOD - create new post

  if (req.method === "POST") {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const post = await prisma.post.create({
      data: {
        caption: req.body.data.post.caption,
        video: req.body.data.post.video,
        topic: req.body.data.post.topic,
        userId: user.id,
      },
    });
    if (post.id) {
      res.status(200).json(post);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.end();
  }
}
