import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;

    const videos = await prisma.post.findMany({
      where: {
        caption: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      include: {
        user: true,
      },
    });

    res.status(200).json(videos);
  }
}
