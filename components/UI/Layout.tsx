import React, { ReactNode, useContext } from "react";
import { ThemeContext } from "../../states/context/theme/ThemeContext";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { dark } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`xl:w-screen xl:px-64 m-auto overflow-hidden h-[100vh] ${
          dark ? "bg-primary-dark-400" : "bg-primary-light-400"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
