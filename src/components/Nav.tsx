import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import NavLinks from "./NavLinks";
import NavLinkLogged from "./NavLinkLogged";
import { useContext, useState } from "react";
import { context } from "@/UserContext";

const Nav = ({
  darkMode,
  handleDarkLight,
  setWordsToSearch,
}: {
  darkMode: boolean;
  handleDarkLight: Function;
  setWordsToSearch: Function;
}) => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const { user } = useContext(context);

  return (
    <>
      <nav
        className={
          darkMode
            ? "h-12 flex justify-between items-center bg-slate-900 shadow-md"
            : "h-12 flex justify-between items-center bg-white shadow-md"
        }
      >
        <Link
          href={"/"}
          className={
            darkMode
              ? "md:ml-12 ml-2 text-slate-100 text-2xl font-bold"
              : "md:ml-12 ml-2 text-stone-700 text-2xl font-bold"
          }
        >
          nosApuntes
        </Link>
        <div className=" mr-4 md:mr-12 sm:flex items-center hidden">
          <button onClick={() => handleDarkLight()}>
            <FontAwesomeIcon
              icon={darkMode ? faMoon : faSun}
              className={
                darkMode
                  ? "text-lg mr-4 text-stone-50 hover:text-stone-300"
                  : "text-lg mr-4 text-stone-600 hover:text-stone-400"
              }
            />
          </button>

          <form
            className="mr-4 flex items-stretch"
            onSubmit={(e: any) => {
              e.preventDefault();
              try {
                setWordsToSearch(e.currentTarget.elements.search.value);
              } catch (e) {}
            }}
          >
            <input
              type="text"
              id="search"
              autoComplete="off"
              className={
                darkMode
                  ? "bg-slate-800 border-2 border-slate-700 focus:outline-none text-slate-50 text-center"
                  : "border-2 border-stone-400 focus:outline-none text-center"
              }
            />
            <button
              className={
                darkMode
                  ? "bg-slate-800  border-r-2 border-b-2 border-t-2 border-slate-600 text-slate-50 px-1 hover:text-slate-400"
                  : " border-r-2 border-b-2 border-t-2 border-stone-400 px-1 hover:text-stone-400"
              }
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          {!user.username ? (
            <NavLinks darkMode={darkMode} />
          ) : (
            <NavLinkLogged darkMode={darkMode} />
          )}
        </div>

        <button
          className="sm:hidden mr-4"
          onClick={() =>
            showResponsiveMenu
              ? setShowResponsiveMenu(false)
              : setShowResponsiveMenu(true)
          }
        >
          <FontAwesomeIcon
            icon={showResponsiveMenu ? faXmark : faBars}
            className={
              darkMode
                ? "text-lg text-stone-50 hover:text-stone-300"
                : "text-lg  text-stone-600 hover:text-stone-400"
            }
          />
        </button>
      </nav>

      {showResponsiveMenu && (
        <div
          className={
            darkMode
              ? "h-screen sm:hidden flex flex-col items-end bg-slate-800 justify-start"
              : "h-screen sm:hidden flex flex-col items-end bg-white justify-start"
          }
        >
          <button onClick={() => handleDarkLight()}>
            <FontAwesomeIcon
              icon={darkMode ? faMoon : faSun}
              className={
                darkMode
                  ? "text-lg text-stone-50 hover:text-stone-300 mr-8 mt-8"
                  : "text-lg  text-stone-600 hover:text-stone-400 mr-8 mt-8"
              }
            />
          </button>

          <form
            className="mr-8 mt-8 flex items-stretch"
            onSubmit={(e: any) => {
              e.preventDefault();
              try {
                setWordsToSearch(e.currentTarget.elements.search.value);
              } catch (e) {}
            }}
          >
            <input
              type="text"
              id="search"
              name="wordsToSearch"
              autoComplete="off"
              className={
                darkMode
                  ? "bg-slate-800 border-2 border-slate-700 focus:outline-none text-slate-50 text-center"
                  : "border-2 border-stone-400 focus:outline-none text-center"
              }
            />
            <button
              type="submit"
              className={
                darkMode
                  ? "bg-slate-800  border-r-2 border-b-2 border-t-2 border-slate-600 text-slate-50 px-1 hover:text-slate-400"
                  : " border-r-2 border-b-2 border-t-2 border-stone-400 px-1 hover:text-stone-400"
              }
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>

          {!user.username ? (
            <NavLinks darkMode={darkMode} />
          ) : (
            <NavLinkLogged darkMode={darkMode} />
          )}
        </div>
      )}
    </>
  );
};

export default Nav;
