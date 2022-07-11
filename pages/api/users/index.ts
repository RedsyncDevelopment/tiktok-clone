import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get session details

  // HTTP GET METHOD - get all posts
  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      include: {
        comment: true,
        likes: true,
        post: true,
      },
    });

    if (users) {
      res.status(200).json(users);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.end();
  }
}
