import { prisma } from "./prisma";

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
