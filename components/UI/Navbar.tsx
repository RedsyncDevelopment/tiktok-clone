import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../utils/tiktik-logo.png";

interface NavbarProps {
  children?: ReactNode;
}
const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { data: session } = useSession();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 h-16">
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
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {session ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />
                <span className="hidden md:block">Upload</span>
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
            <FcGoogle className="text-xl" /> <p>Sign In With Google</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
