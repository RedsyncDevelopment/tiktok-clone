import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  allVideosQuery,
  createNewVideoQuery,
  findUserBySession,
} from "../../../utils/queries";
import { checkIfExists } from "../../../utils/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // HTTP GET METHOD - get all posts
  if (req.method === "GET") {
    const posts = await allVideosQuery();
    checkIfExists(res, posts, 400, "Posts not found!");
    res.status(200).json(posts);
    res.end();
  }

  //HTTP POST METHOD - create new post

  if (req.method === "POST") {
    const session = await getSession({ req });
    const { post } = req.body;
    checkIfExists(res, session, 401, "Unauthorized access!");
    const user = await findUserBySession(session);
    checkIfExists(res, user, 400, "User not found!");
    const singlePost = await createNewVideoQuery(user, post);
    checkIfExists(res, singlePost, 400, "Post not found!");
    res.status(200).json(singlePost);
    res.end();
  }
}
