import axios from "axios";
import { NextPage } from "next";
import { ReactNode, useContext } from "react";
import NoResults from "../components/pages/home/NoResults";
import VideoCard from "../components/pages/home/VideoCard";
import Sidebar from "../components/UI/Sidebar/Sidebar";
import { ThemeContext } from "../states/context/theme/ThemeContext";
import { BASE_URL } from "../utils";

interface HomeProps {
  children: ReactNode;
  videos: any;
}

const Home: NextPage<HomeProps> = ({ videos }) => {
  const { dark } = useContext(ThemeContext);
  return (
    <>
      <div className={`flex gap-6 md:gap-20 `}>
        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <div className="overflow-auto h-[88vh] videos">
          <div
            className={`flex flex-col gap-10 videos h-full ${
              dark ? "text-primary-light-400 " : "text-primary-dark-400 "
            }`}
          >
            {videos.length ? (
              videos.map((video: any) => (
                <VideoCard post={video} key={video.id} />
              ))
            ) : (
              <NoResults text={"No Videos"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: response.data,
    },
  };
};
