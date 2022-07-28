import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import { GoVerified } from "react-icons/go";
import NoResults from "../../components/pages/home/NoResults";
import VideoCard from "../../components/pages/home/VideoCard";
import { ThemeContext } from "../../states/context/theme/ThemeContext";
import useStore from "../../states/store/useStore";
import { BASE_URL } from "../../utils";

interface SearchProps {
  children?: ReactNode;
  videos: any;
}

const Search: NextPage<SearchProps> = ({ videos }) => {
  const { dark } = useContext(ThemeContext);

  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers } = useStore();
  const router = useRouter();
  const { searchTerm }: any = router.query;

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  const searchedAccounts = allUsers.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full">
        <div
          className={`flex gap-10 mb-10 mt-10 justify-center w-full ${
            dark ? "bg-primary-dark-400" : "bg-primary-light-400"
          }`}
        >
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${accounts} ${
              dark
                ? "text-primary-light-400 border-white"
                : "text-primary-dark-400"
            }`}
            onClick={() => setIsAccounts(true)}
          >
            Accounts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos} ${
              dark
                ? "text-primary-light-400 border-white"
                : "text-primary-dark-400"
            }`}
            onClick={() => setIsAccounts(false)}
          >
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div className="md:mt-10">
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: any, i: number) => (
                <Link href={`/profile/${user.id}`} key={i}>
                  <div
                    className={`flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 ${
                      dark ? "text-primary-light-400" : "text-primary-dark-400"
                    }`}
                  >
                    <div>
                      <Image
                        src={user.image}
                        width={50}
                        height={50}
                        className="rounded-full"
                        alt="user profile"
                      />
                    </div>
                    <div className="">
                      <p className="flex gap-1 items-center text-md font-bold text-primary-dark-200ry lowercase">
                        {user.name.replaceAll(" ", "")}
                        <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-xs">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResults text={`No account results for "${searchTerm}"`} />
            )}
          </div>
        ) : (
          <div
            className={`flex flex-col items-center overflow-auto h-[78vh] videos`}
          >
            {videos.length ? (
              videos.map((video: any, i: number) => (
                <VideoCard post={video} key={i} />
              ))
            ) : (
              <NoResults text={`No video results for "${searchTerm}"`} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: {
      videos: res.data,
    },
  };
};

export default Search;
