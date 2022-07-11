import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ error: "Something went wrong" });
    }
    const post = await prisma.post.findFirst({
      where: {
        id: id,
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
  if (req.method === "PUT") {
    const { id } = req.query;
    const { userId, comment } = req.body;
    if (!id) {
      res.status(400).json({ error: "Something went wrong" });
    }
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    if (!post) {
      res.status(400).json({ error: "Post not found" });
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    const createComment = await prisma.comment.create({
      data: {
        body: comment,
        userId: user?.id,
        postId: post?.id,
      },
    });

    const findPost = await prisma.post.findFirst({
      where: {
        id: post?.id,
      },
      include: {
        comment: true,
      },
    });

    if (createComment.id) {
      res.status(200).json(findPost);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.end();
  }
}
