import { NextApiRequest, NextApiResponse } from "next";
import { allUsersQuery } from "../../../utils/queries";
import { checkIfExists } from "../../../utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get session details

  // HTTP GET METHOD - get all posts
  if (req.method === "GET") {
    const users = await allUsersQuery();
    checkIfExists(res, users, 400, "Users not found");
    res.status(200).json(users);
    res.end();
  }
}
