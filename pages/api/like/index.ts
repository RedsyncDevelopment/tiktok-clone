import { NextApiRequest, NextApiResponse } from "next";
import {
  createNewLike,
  deleteLike,
  findLikesByPostAndUser,
  findUserByEmail,
  findVideoById,
} from "../../../utils/queries";
import { checkIfExists } from "../../../utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { email, postId, like } = req.body.data;
    const user = await findUserByEmail(email);
    checkIfExists(res, user, 400, "User not found");
    const post = await findVideoById(postId);
    checkIfExists(res, post, 400, "Post not found");
    if (like) {
      const newLike = await createNewLike(post, user);
      const findPost = await findVideoById(post?.id);

      if (newLike.id) {
        res.status(200).json(findPost);
      } else {
        return res.status(500).json({ error: "Something went wrong" });
      }
      res.end();
    } else {
      const findLike = await findLikesByPostAndUser(post, user);
      await deleteLike(findLike?.id);
      const findPost = await findVideoById(post?.id);
      res.status(200).json(findPost);
    }
  }
}
