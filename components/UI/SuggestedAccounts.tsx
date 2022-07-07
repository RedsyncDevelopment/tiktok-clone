import React, { ReactNode } from "react";

interface SuggestedAccountsProps {
  children?: ReactNode;
}

const SuggestedAccounts: React.FC<SuggestedAccountsProps> = ({ children }) => {
  return (
    <>
      <div>SuggestedAccounts</div>
    </>
  );
};

export default SuggestedAccounts;
