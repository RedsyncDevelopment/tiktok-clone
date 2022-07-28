import { useSession } from "next-auth/react";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { ThemeContext } from "../../../states/context/theme/ThemeContext";

interface LikeButtonProps {
  children?: ReactNode;
  handleLike: () => void;
  handleDislike: () => void;
  likes: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  children,
  handleDislike,
  handleLike,
  likes,
}) => {
  const { dark } = useContext(ThemeContext);
  const { data: session } = useSession();
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const filterLikes = likes?.filter(
    (like: any) => like.userId === session?.user.id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes]);

  return (
    <>
      <div className="flex gap-6">
        <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
          {alreadyLiked ? (
            <div
              onClick={handleDislike}
              className={`rounded-full p-2 md:p-4 text-[#f51997] ${
                dark ? "bg-primary-dark-400" : "bg-primary-light-400"
              }`}
            >
              <MdFavorite className="text-lg md:text-2xl" />
            </div>
          ) : (
            <div
              onClick={handleLike}
              className={`rounded-full p-2 md:p-4 ${
                dark ? "bg-primary-dark-400" : "bg-primary-light-400"
              }`}
            >
              <MdFavorite className="text-lg md:text-2xl" />
            </div>
          )}
          <p className="text-md font-semibold">{likes?.length || 0}</p>
        </div>
      </div>
    </>
  );
};

export default LikeButton;
