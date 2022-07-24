import Link from "next/link";
import React, { ReactNode } from "react";
import { BiErrorCircle } from "react-icons/bi";

interface NotFoundProps {
  children?: ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({ children }) => {
  return (
    <>
      <div className="flex justify-center items-center min-h-full relative z-20">
        <h2 className="flex flex-col justify-center items-center z-20">
          <span className="font-bold text-xl">404</span>
          <span>Page Not Found!</span>
          <Link href="/">
            <span className="mt-4 px-4 py-2 border-2 border-gray-200 cursor-pointer text-[#f51997] hover:bg-gray-200 ">
              Back to Home
            </span>
          </Link>
        </h2>
        <BiErrorCircle className="absolute top-[50%] translate-y-[-50%] text-[200px] md:text-[400px] text-[#f5199610] z-10" />
      </div>
    </>
  );
};

export default NotFound;
