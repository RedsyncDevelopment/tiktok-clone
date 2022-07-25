import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import { ThemeContext } from "../../../states/context/theme/ThemeContext";
import Logo from "../../../utils/tiktik-logo.png";
import SearchBar from "./SearchBar";

interface NavbarProps {
  children?: ReactNode;
}
const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { dark, toggleTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue) {
      await router.push(`/search/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <div
      className={`w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 h-16 ${
        dark ? "bg-primary-dark-400" : "bg-primary-light-400"
      }`}
    >
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            layout="responsive"
          ></Image>
        </div>
      </Link>
      <SearchBar
        handleSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className="flex gap-5 justify-center items-center">
        <div>
          <button onClick={toggleTheme}>
            {dark ? (
              <div>
                <BsSunFill className={`text-primary-light-400`} />
              </div>
            ) : (
              <div>
                <BsMoonFill className={`text-primary-dark-400`} />
              </div>
            )}
          </button>
        </div>
        {session ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd
                  className={`text-xl ${
                    dark ? "text-primary-light-200" : "text-primary-dark-200"
                  }`}
                />
                <span
                  className={`hidden md:block ${
                    dark ? "text-primary-light-400" : "text-primary-dark-400"
                  }`}
                >
                  Upload
                </span>
              </button>
            </Link>
            {session.user?.image && (
              <Link href="">
                <>
                  <Image
                    width={30}
                    height={30}
                    className="rounded-full cursor-pointer"
                    src={session.user.image}
                    alt="profile photo"
                  ></Image>
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 cursor-pointer p-2 border-2 border-gray-200 rounded-xl"
            onClick={() =>
              signIn("google", { redirect: false, callbackUrl: "/" })
            }
          >
            <FcGoogle className="text-xl" />{" "}
            <p className="hidden sm:block">Sign In With Google</p>
            <p className="block sm:hidden">Sign In</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
