import React, { ReactNode } from "react";

interface NoResultsProps {
  children?: ReactNode;
  text: string;
}

const NoResults: React.FC<NoResultsProps> = ({ text }) => {
  return (
    <>
      <div></div>
    </>
  );
};

export default NoResults;
