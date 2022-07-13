import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";
import { findAllPostsOfSingleUser, findUserById } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ error: "Something went wrong" });
    }
    const user = await findUserById(id);
    const post = await findAllPostsOfSingleUser(user);

    const likedPosts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId: user?.id,
          },
        },
      },
      include: {
        user: true,
      },
    });

    if (!likedPosts) {
      res.status(400).json({ error: "No post with that id" });
    }
    res.status(200).json({ user, post, likedPosts });
    res.end();
  }
}
