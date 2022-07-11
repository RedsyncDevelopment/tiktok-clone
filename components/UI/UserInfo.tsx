import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { GoVerified } from "react-icons/go";

interface UserInfoProps {
  children?: ReactNode;
  post: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ children, post }) => {
  return (
    <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
      <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
        <Link href={`/profile/${post.userId}`}>
          <>
            <Image
              width={62}
              height={62}
              className="rounded-full"
              src={post.user.image}
              alt="profile photo"
              layout="responsive"
            ></Image>
          </>
        </Link>
      </div>
      <div className="flex flex-col">
        <Link href={`/profile/${post.userId}`}>
          <div className="mt-1 flex flex-col gap-2">
            <p className="flex gap-2 items-center md:text-md font-bold text-primary">
              {post.user.name} <GoVerified className="text-blue-400 text-md" />
            </p>
            <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
              {post.user.name}
            </p>
          </div>
        </Link>
        <div className="flex gap-4">
          <span className="font-medium text-xs text-gray-500 hidden md:block">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
