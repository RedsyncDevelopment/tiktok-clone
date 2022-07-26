import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useContext } from "react";
import { ThemeContext } from "../../states/context/theme/ThemeContext";
import { topics } from "../../utils/constants";

interface DiscoverProps {
  children?: ReactNode;
}

const Discover: React.FC<DiscoverProps> = ({ children }) => {
  const router = useRouter();
  const { dark } = useContext(ThemeContext);
  const { topic } = router.query;
  const activeTopicStyle = `xl:border-2  xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#ff1997] ${
    dark ? "hover:bg-primary-dark-200" : "hover:bg-primary"
  }`;

  const topicStyle = `xl:border-2  xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer  ${
    dark
      ? "hover:bg-primary-dark-200 text-primary-light-400"
      : "hover:bg-primary text-black"
  }`;

  const themedIcon = `font-bold text-2xl xl:text-md ${
    dark ? "text-primary-light-400" : "text-primary-dark-400"
  }`;

  const themedItem = `font-medium text-md hidden xl:block ${
    dark ? "text-primary-light-400" : "text-primary-dark-400"
  }`;

  return (
    <>
      <div className="xl:border-b-2 xl:border-gray-200 pb-6">
        <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
          Popular Topics
        </p>
        <div className="flex gap-3 flex-wrap">
          {topics.map((item) => (
            <Link href={`/?topic=${item.name}`} key={item.name}>
              <div
                className={topic === item.name ? activeTopicStyle : topicStyle}
              >
                <span className={themedIcon}>{item.icon}</span>
                <span className={themedItem}>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discover;
