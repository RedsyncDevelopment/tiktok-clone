import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import { ReactNode, useContext, useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/pages/home/NoResults";
import VideoCard from "../../components/pages/home/VideoCard";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import { ThemeContext } from "../../states/context/theme/ThemeContext";
import { BASE_URL } from "../../utils";

interface ProfileProps {
  children?: ReactNode;
  data: any;
}

const Profile: NextPage<ProfileProps> = ({ data }) => {
  const { dark } = useContext(ThemeContext);
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
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="w-full">
          <div
            className={`flex gap-6 md:gap-10 mb-4 w-full ${
              dark
                ? "bg-primary-dark-400 text-primary-light-400"
                : "bg-primary-light-400 text-primary-dark-400"
            }`}
          >
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
              <p className="md:text-2xl tracking-wider items-center justify-center flex gap-1 text-md font-bold text-primary-dark-200ry lowercase">
                {user.name.replaceAll(" ", "")}
                <GoVerified className="text-blue-400" />
              </p>
              <p
                className={`md:text-xl capitalize text-xs ${
                  dark ? "text-primary-dark-200" : "text-primary-light-700"
                }`}
              >
                {user.name}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div
              className={`flex gap-10 mb-10 mt-10 w-full ${
                dark ? "bg-primary-dark-400 " : "bg-primary-light-400 "
              }`}
            >
              <p
                className={`text-xl font-semibold cursor-pointer mt-2 ${videos} ${
                  dark
                    ? "text-primary-light-400 border-white"
                    : "text-primary-dark-400"
                }`}
                onClick={() => setShowUserVideos(true)}
              >
                Videos
              </p>
              <p
                className={`text-xl font-semibold cursor-pointer mt-2 ${liked} ${
                  dark
                    ? "text-primary-light-400 border-white"
                    : "text-primary-dark-400"
                }`}
                onClick={() => setShowUserVideos(false)}
              >
                Liked
              </p>
            </div>
            <div
              className={`flex flex-col overflow-auto gap-12 h-[60vh] videos`}
            >
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
