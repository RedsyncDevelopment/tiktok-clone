import { NextApiRequest, NextApiResponse } from "next";
import {
  createNewComment,
  findUserById,
  findVideoById,
} from "../../../utils/queries";
import { checkIfExists } from "../../../utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    checkIfExists(res, id, 400, "Something went wrong");
    const post = await findVideoById(id);
    checkIfExists(res, post, 400, "Post not found");
    res.status(200).json(post);
    res.end();
  }
  if (req.method === "PUT") {
    const { id } = req.query;
    const { userId, comment } = req.body;
    checkIfExists(res, id, 400, "Something went wrong");
    const post = await findVideoById(id);
    checkIfExists(res, post, 400, "Post not found");
    const user = await findUserById(userId);
    checkIfExists(res, user, 400, "User not found");
    const createComment = await createNewComment(comment, post, user);
    const findPost = await findVideoById(post?.id);

    if (createComment.id) {
      res.status(200).json(findPost);
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
    res.end();
  }
}
