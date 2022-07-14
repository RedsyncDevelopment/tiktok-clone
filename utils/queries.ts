import { prisma } from "./prisma";

// VIDEO QUERIES

export const allVideosQuery = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comment: true,
      likes: true,
      user: true,
    },
  });
  return posts;
};

export const findVideoById = async (postId: string | undefined) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      user: true,
      likes: true,
      comment: true,
    },
  });
  return post;
};

export const findVideoByTopic = async (topic: string) => {
  const post = await prisma.post.findMany({
    where: {
      topic: topic,
    },
    include: {
      user: true,
      comment: true,
      likes: true,
    },
  });
  return post;
};

export const searchVideoQuery = async (searchTerm: string) => {
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
  return videos;
};

export const createNewVideoQuery = async (user: any, videoInfo: any) => {
  const singlePost = await prisma.post.create({
    data: {
      caption: videoInfo.caption,
      video: videoInfo.video,
      topic: videoInfo.topic,
      userId: user.id,
    },
  });
  return singlePost;
};

// USER QUERIES

export const allUsersQuery = async () => {
  const users = await prisma.user.findMany({
    include: {
      comment: true,
      likes: true,
      post: true,
    },
  });
  return users;
};

export const findUserBySession = async (session: any) => {
  const user = await prisma.user.findFirst({
    where: {
      email: session.user?.email!,
    },
  });
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      post: true,
      comment: true,
      likes: true,
    },
  });
  return user;
};

// #FIXME Import User type from prisma generated types - need to find adequate type
export const findAllPostsOfSingleUser = async (user: any) => {
  const post = await prisma.post.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      user: true,
    },
  });
  return post;
};

export const findAllLikedVideosFromUser = async (user: any) => {
  const likedPosts = await prisma.post.findMany({
    where: {
      likes: {
        some: {
          userId: user?.id,
        },
      },
    },
    include: {
      user: true,
    },
  });
  return likedPosts;
};

// LIKE QUERIES

export const createNewLike = async (post: any, user: any) => {
  const newLike = await prisma.likes.create({
    data: {
      value: true,
      postId: post?.id,
      userId: user?.id,
    },
  });
  return newLike;
};

export const findLikesByPostAndUser = async (post: any, user: any) => {
  const findLike = await prisma.likes.findFirst({
    where: {
      postId: post?.id,
      userId: user?.id,
    },
  });
  return findLike;
};

export const deleteLike = async (postId: string | undefined) => {
  await prisma.likes.delete({
    where: {
      id: postId,
    },
  });
};

// COMMENT QUERIES

export const createNewComment = async (
  message: string,
  post: any,
  user: any
) => {
  const createComment = await prisma.comment.create({
    data: {
      body: message,
      userId: user?.id,
      postId: post?.id,
    },
  });

  return createComment;
};
