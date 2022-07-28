import { ReactNode, useContext, useEffect, useRef, useState } from "react";

import { BsFillPlayFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import Comments from "../../components/pages/details/Comments";
import LikeButton from "../../components/pages/details/LikeButton";
import UserInfo from "../../components/UI/UserInfo";
import { ThemeContext } from "../../states/context/theme/ThemeContext";
import { BASE_URL } from "../../utils";

interface DetailProps {
  children?: ReactNode;
  postDetails: any;
}

const Detail: NextPage<DetailProps> = ({ postDetails }) => {
  const { data: session } = useSession();
  const { dark } = useContext(ThemeContext);

  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const onVideoClick = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (session) {
      const response = await axios.put(`${BASE_URL}/api/like`, {
        data: {
          email: session.user?.email,
          postId: post.id,
          like,
        },
      });
      setPost({ ...post, likes: response.data.likes });
    }
  };

  const addComment = async (e: any) => {
    e.preventDefault();
    if (session && comment) {
      setIsPostingComment(true);
      const { data } = await axios.put(`${BASE_URL}/api/post/${post.id}`, {
        userId: session.user.id,
        comment,
      });
      setPost({ ...post, comment: data.comment });
      setComment("");
      setIsPostingComment(false);
    }
  };

  useEffect(() => {
    if (post && videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted, post]);

  if (!post) return null;

  return (
    <>
      <div
        className={`flex w-full absolute left-0 top-0 flex-wrap lg:flex-nowrap ${
          dark ? "bg-primary-dark-400" : "bg-primary-light-400"
        }`}
      >
        <div className="relative flex-2 w-[1000px] lg:w:9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
          <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
            <p
              onClick={() => {
                router.back();
              }}
              className="cursor-pointer"
            >
              <MdOutlineCancel
                className={` text-[35px] ${
                  dark ? "text-primary-dark-400" : "text-primary-light-400"
                }`}
              />
            </p>
          </div>
          <div className="relative">
            <div className="lg:h-[100vh] h-[60vh]">
              <video
                ref={videoRef}
                loop
                onClick={onVideoClick}
                src={post.video}
                className="h-full cursor-pointer"
              ></video>
            </div>
            <div className="absolute top-[45%] left-[45%] cursor-pointer">
              {!playing && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill
                    className={`text-6xl lg:text-8xl ${
                      dark ? "text-primary-dark-400" : "text-primary-light-400"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer ">
            {isVideoMuted ? (
              <button onClick={() => setIsVideoMuted(false)}>
                <HiVolumeOff
                  className={`text-2xl lg:text-4xl ${
                    dark ? "text-primary-dark-400" : "text-primary-light-400"
                  }`}
                />
              </button>
            ) : (
              <button onClick={() => setIsVideoMuted(true)}>
                <HiVolumeUp
                  className={`text-2xl lg:text-4xl ${
                    dark ? "text-primary-dark-400" : "text-primary-light-400"
                  }`}
                />
              </button>
            )}
          </div>
        </div>
        <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
          <div className="lg:mt-20 mt-10">
            <UserInfo post={post} />
          </div>
          <p
            className={`px-10 text-lg mt-5 ${
              dark ? "text-primary-light-400" : "text-primary-dark-400"
            }`}
          >
            {post.caption}
          </p>
          <div
            className={`mt-5 mb-2 px-10 ${
              dark ? "text-primary-light-400" : "text-primary-dark-400"
            }`}
          >
            {session && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
          <Comments
            comment={comment}
            comments={post.comment}
            setComment={setComment}
            addComment={addComment}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </>
  );
};

export default Detail;

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: {
      postDetails: data,
    },
  };
};
