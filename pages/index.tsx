import axios from "axios";
import { NextPage } from "next";
import { ReactNode } from "react";
import NoResults from "../components/pages/home/NoResults";
import VideoCard from "../components/pages/home/VideoCard";
import { BASE_URL } from "../utils";

interface HomeProps {
  children: ReactNode;
  videos: any;
}

const Home: NextPage<HomeProps> = ({ videos }) => {
  return (
    <>
      <div className="flex flex-col gap-10 videos h-full">
        {videos.length ? (
          videos.map((video: any) => <VideoCard post={video} key={video.id} />)
        ) : (
          <NoResults text={"No Videos"} />
        )}
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
