import React, { useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { ThemeContext } from "../../../states/context/theme/ThemeContext";

interface SearchBarProps {
  handleSearch: (e: React.FormEvent) => void;
  searchValue: string;
  setSearchValue: any;
}

const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  searchValue,
  setSearchValue,
}) => {
  const { dark } = useContext(ThemeContext);
  return (
    <>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className={`absolute md:static top-10 -left-20 ${
            dark ? "bg-primary-dark-400" : "bg-primary-light-400"
          }`}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
            className={`p-3 pl-6 md:text-md font-medium border-2  focus:outline-none focus:border-2 w-[300px] md:w-[350px] rounded-full md:top-0 ${
              dark
                ? "bg-primary-dark-400 border-primary-dark-200 focus:border-primary-light-400 text-primary-light-400 placeholder:text-primary-dark-200"
                : "bg-primary-light-400 border-primary-light-200 focus:border-primary-light-700"
            }`}
          />
          <button
            onClick={handleSearch}
            className={`absolute md:right-5 right-6 top-4 border-l-2  pl-4 text-2xl  ${
              dark
                ? "border-primary-dark-200 text-primary-dark-200"
                : "border-primary-light-700 text-primary-light-700"
            }`}
          >
            <BiSearch />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
