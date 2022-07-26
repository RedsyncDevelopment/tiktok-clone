import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useContext, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import { ThemeContext } from "../../../states/context/theme/ThemeContext";
import useStore from "../../../states/store/useStore";

interface SuggestedAccountsProps {
  children?: ReactNode;
}

const SuggestedAccounts: React.FC<SuggestedAccountsProps> = ({ children }) => {
  const { dark } = useContext(ThemeContext);
  const { fetchAllUsers, allUsers } = useStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <>
      <div className="lg:border-b-2 border-gray-200 pb-4">
        <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
          Suggested Accounts
        </p>
        <div>
          {allUsers.slice(0, 6).map((user: any) => (
            <Link href={`/profile/${user.id}`} key={user.id}>
              <div
                className={`flex gap-3  p-2 cursor-pointer font-semibold rounded ${
                  dark ? "hover:bg-primary-dark-200" : "hover:bg-primary"
                }`}
              >
                <div className="w-8 h-8">
                  <Image
                    src={user.image}
                    width={34}
                    height={34}
                    className="rounded-full"
                    alt="user profile"
                    layout="responsive"
                  />
                </div>
                <div className="hidden xl:block">
                  <p
                    className={`flex gap-1 items-center text-md font-bold  lowercase ${
                      dark ? "text-primary-light-200" : "text-primary-dark-200"
                    }`}
                  >
                    {user.name.replaceAll(" ", "")}
                    <GoVerified className="text-blue-400" />
                  </p>
                  <p className={`capitalize text-gray-400 text-xs `}>
                    {user.name}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuggestedAccounts;
