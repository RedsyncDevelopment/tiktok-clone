import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { email, postId, like } = req.body.data;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).json({ error: "User not found" });
    }
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      res.status(400).json({ error: "Post not found" });
    }
    if (like) {
      const newLike = await prisma.likes.create({
        data: {
          value: true,
          postId: post?.id,
          userId: user?.id,
        },
      });

      const findPost = await prisma.post.findFirst({
        where: {
          id: post?.id,
        },
        include: {
          likes: true,
        },
      });

      if (newLike.id) {
        res.status(200).json(findPost);
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
      res.end();
    } else {
      const findLike = await prisma.likes.findFirst({
        where: {
          postId: post?.id,
          userId: user?.id,
        },
      });
      await prisma.likes.delete({
        where: {
          id: findLike?.id,
        },
      });
      const findPost = await prisma.post.findFirst({
        where: {
          id: post?.id,
        },
        include: {
          likes: true,
        },
      });
      res.status(200).json(findPost);
    }
  }
}
