import React, { ReactNode } from "react";

interface DetailProps {
  children?: ReactNode;
}

const Detail: React.FC<DetailProps> = ({ children }) => {
  return (
    <>
      <div>Detail</div>
    </>
  );
};

export default Detail;
