import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { ThemeContext } from "../../../states/context/theme/ThemeContext";
import Discover from "../Discover";
import Footer from "../Footer";
import SuggestedAccounts from "./SuggestedAccounts";

interface SidebarProps {
  children?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { data: session } = useSession();
  const { dark } = useContext(ThemeContext);

  const [showSidebar, setShowSidebar] = useState(true);
  const normalLink = `${
    dark ? "hover:bg-primary-dark-200" : "hover:bg-primary-light-700"
  } flex items-center gap-3  p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded`;

  const themedIcon = `${
    dark ? "text-primary-light-400" : "text-primary-dark-400"
  }`;

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? (
          <ImCancelCircle className={themedIcon} />
        ) : (
          <AiOutlineMenu className={themedIcon} />
        )}
      </div>
      {showSidebar && (
        <div
          className={`xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2  xl:border-0 p-3 ${
            dark ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {!session && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">
                Log in to like and comment on videos
              </p>
              <div className="pr-4">
                <button
                  onClick={() =>
                    signIn("google", { redirect: false, callbackUrl: "/" })
                  }
                  className="bg-white text-lg text-[#f51997] border-[1px] border-[#f51997] px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#f51997] cursor-pointer"
                >
                  Log in
                </button>
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};
export default Sidebar;
