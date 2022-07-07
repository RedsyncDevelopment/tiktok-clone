import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../utils/tiktik-logo.png";

interface NavbarProps {
  children?: ReactNode;
}
const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { data: session } = useSession();

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
      <div>SEARCH</div>
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
