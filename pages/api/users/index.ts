import { NextApiRequest, NextApiResponse } from "next";
import { allUsersQuery } from "../../../utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get session details

  // HTTP GET METHOD - get all posts
  if (req.method === "GET") {
    const users = await allUsersQuery();

    if (!users) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.status(200).json(users);
    res.end();
  }
}
