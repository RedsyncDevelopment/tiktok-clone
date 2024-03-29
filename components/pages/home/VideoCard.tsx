import Link from "next/link";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { ThemeContext } from "../../../states/context/theme/ThemeContext";
import UserInfo from "../../UI/UserInfo";

interface VideoCardProps {
  children?: ReactNode;
  post: any;
}

const VideoCard: React.FC<VideoCardProps> = ({ children, post }) => {
  const { dark } = useContext(ThemeContext);

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <>
      <div className="flex flex-col pb-6 gap-2">
        <div>
          <UserInfo post={post} />
        </div>
        <div className="lg:ml-24 flex gap-4 relative ml-10">
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
                className={`lg:w-[600px] h-[300px] md:h-[400px] md:w-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer  ${
                  dark ? "bg-primary-dark-700" : "bg-primary-light-200"
                }`}
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
