import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";

interface VideoCardProps {
  children?: ReactNode;
  post: any;
}

const VideoCard: React.FC<VideoCardProps> = ({ children, post }) => {
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <div className="flex flex-col border-b-2 border-gray-200 pb-6">
        <div>
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href="">
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-fill"
                    src={post.user.image}
                    alt="profile photo"
                    layout="responsive"
                  ></Image>
                </>
              </Link>
            </div>
            <div className="flex flex-col">
              <Link href="">
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.user.name}{" "}
                    <GoVerified className="text-blue-400 text-md" />
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
        </div>
        <div className="lg:ml-20 flex gap-4 relative">
          <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="rounded-3xl"
          >
            <Link href={`/detail/${post.id}`}>
              <video
                ref={videoRef}
                src={post.video}
                loop
                autoPlay
                muted
                className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
              ></video>
            </Link>
            {isHover && (
              <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}
                {isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                    <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={() => setIsVideoMuted(true)}>
                    <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;