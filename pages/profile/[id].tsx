import axios from "axios";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/pages/home/NoResults";
import VideoCard from "../../components/pages/home/VideoCard";
import { BASE_URL } from "../../utils";

interface ProfileProps {
  children?: ReactNode;
  data: any;
}

const Profile: React.FC<ProfileProps> = ({ children, data }) => {
  const [showUserVideos, setShowUserVideos] = useState(true);
  const [videosList, setVideosList] = useState([]);
  const { user, post, likedPosts } = data;

  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideosList(post);
    } else {
      setVideosList(likedPosts);
    }
  }, [showUserVideos, post, likedPosts]);

  return (
    <>
      <div className="w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              width={120}
              height={120}
              className="rounded-full"
              src={user.image}
              alt="profile photo"
              layout="responsive"
            ></Image>
          </div>
          <div className="flex flex-col justify-center">
            <p className="md:text-2xl tracking-wider items-center justify-center flex gap-1 text-md font-bold text-primary lowercase">
              {user.name.replaceAll(" ", "")}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="md:text-xl capitalize text-gray-400 text-xs">
              {user.name}
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
              onClick={() => setShowUserVideos(true)}
            >
              Videos
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
              onClick={() => setShowUserVideos(false)}
            >
              Liked
            </p>
          </div>
          <div className="flex gap-6 flex-wrap md:justify-start">
            {videosList.length > 0 ? (
              videosList.map((post: any, i: number) => (
                <VideoCard post={post} key={i} />
              ))
            ) : (
              <NoResults
                text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
