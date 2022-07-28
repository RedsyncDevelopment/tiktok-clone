import React, { ReactNode, useContext } from "react";
import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";
import { ThemeContext } from "../../../states/context/theme/ThemeContext";

interface NoResultsProps {
  children?: ReactNode;
  text: string;
}

const NoResults: React.FC<NoResultsProps> = ({ text }) => {
  const { dark } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center w-full pt-12 ${
          dark ? "text-primary-light-200" : "text-primary-dark-400"
        }`}
      >
        <p className="text-6xl lg:text-8xl">
          {text === "No comments yet!" ? (
            <BiCommentX />
          ) : (
            <MdOutlineVideocamOff />
          )}
        </p>
        <p className="text-xl lg:text-2xl text-center">{text}</p>
      </div>
    </>
  );
};

export default NoResults;
