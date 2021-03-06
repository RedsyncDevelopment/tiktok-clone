import { NextApiRequest, NextApiResponse } from "next";
import { searchVideoQuery } from "../../../utils/queries";
import { checkIfExists } from "../../../utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let { searchTerm } = req.query;
    searchTerm = searchTerm.toString();
    const videos = await searchVideoQuery(searchTerm);
    checkIfExists(res, videos, 400, "Videos not found");
    res.status(200).json(videos);
    res.end();
  }
}
