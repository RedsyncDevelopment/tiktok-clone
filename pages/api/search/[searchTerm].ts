import { NextApiRequest, NextApiResponse } from "next";
import { searchVideoQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;
    const videos = await searchVideoQuery(searchTerm);

    if (!videos) {
      res.status(400).json({ error: "No videos found" });
    }
    res.status(200).json(videos);
    res.end();
  }
}
