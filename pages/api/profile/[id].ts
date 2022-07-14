import { NextApiRequest, NextApiResponse } from "next";
import {
  findAllLikedVideosFromUser,
  findAllPostsOfSingleUser,
  findUserById,
} from "../../../utils/queries";
import { checkIfExists } from "../../../utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    checkIfExists(res, id, 400, "Something went wrong!");
    const user = await findUserById(id);
    const post = await findAllPostsOfSingleUser(user);
    const likedPosts = await findAllLikedVideosFromUser(user);
    checkIfExists(res, likedPosts, 400, "Post not found!");
    res.status(200).json({ user, post, likedPosts });
    res.end();
  }
}
