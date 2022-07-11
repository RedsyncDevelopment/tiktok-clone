import axios from "axios";
import { NextPage, NextPageContext } from "next";
import NoResults from "../components/pages/home/NoResults";
import VideoCard from "../components/pages/home/VideoCard";
import { BASE_URL } from "../utils";

interface HomeProps {
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

export const getServerSideProps = async (context: NextPageContext) => {
  const { req, res } = context;
  const { data } = await axios.get(`${BASE_URL}/api/post`);
  return {
    props: {
      videos: data,
    },
  };
};
