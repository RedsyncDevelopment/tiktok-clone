import { NextPage } from "next";
import { ReactNode } from "react";
import NotFound from "../../components/pages/404/404";

interface PageNotFoundProps {
  children: ReactNode;
}

const PageNotFound: NextPage<PageNotFoundProps> = ({ children }) => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default PageNotFound;
