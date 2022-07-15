import { positions } from "@mui/system";
import { NextApiRequest, NextApiResponse } from "next";
import { findVideoByTopic } from "../../../utils/queries";
import { checkIfExists } from "../../../utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let { topic } = req.query;
    topic = topic.toString();
    checkIfExists(res, topic, 400, "Something went wrong!");
    const posts = await findVideoByTopic(topic);
    checkIfExists(res, positions, 400, "Posts not found");
    res.status(200).json(posts);
    res.end();
  }
}
