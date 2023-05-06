import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import NavLinks from "./NavLinks";
import NavLinkLogged from "./NavLinkLogged";
import { useContext } from "react";
import { context } from "@/UserContext";

const Nav = ({
  darkMode,
  handleDarkLight,
}: {
  darkMode: boolean;
  handleDarkLight: Function;
}) => {
  const { user } = useContext(context);

  return (
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
            ? "ml-12 text-slate-100 text-2xl font-bold"
            : "ml-12 text-stone-700 text-2xl font-bold"
        }
      >
        nosApuntes
      </Link>
      <div className="mr-12 flex items-center">
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

        <div className="mr-4 flex items-stretch">
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
        </div>

        {!user.username ? (
          <NavLinks darkMode={darkMode} />
        ) : (
          <NavLinkLogged darkMode={darkMode} />
        )}
      </div>
    </nav>
  );
};

export default Nav;
