import { context } from "@/UserContext";
import { logout } from "@/pages/api/fetchs";
import Link from "next/link";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const NavLinks = ({ darkMode }: { darkMode: boolean }) => {
  const { setUser } = useContext(context);
  const handleLogout = async () => {
    await logout();
    setUser({});
  };

  return (
    <div className="text-sm md:text-md flex flex-col items-end sm:flex-row">
      <Link
        href={"/favs"}
        className={
          darkMode
            ? "sm:mr-4 mr-8 mt-8 sm:mt-0 font-bold text-slate-100 hover:text-slate-300"
            : "sm:mr-4 mr-8 mt-8 sm:mt-0 font-bold text-stone-600 hover:text-stone-400"
        }
      >
        <FontAwesomeIcon icon={faStar} className="mr-1" />
        FAVORITOS
      </Link>
      <Link
        href={"/myPosts"}
        className={
          darkMode
            ? "sm:mr-4 mr-8 mt-8 sm:mt-0 font-bold text-slate-100 hover:text-slate-300"
            : "sm:mr-4 mr-8 mt-8 sm:mt-0 font-bold text-stone-600 hover:text-stone-400"
        }
      >
        MIS POSTS
      </Link>
      <Link
        href={"/"}
        className={
          darkMode
            ? "sm:mr-4 mr-8 mt-8 sm:mt-0 font-bold text-slate-400 hover:text-slate-200"
            : "sm:mr-4 mr-8 mt-8 sm:mt-0 font-bold text-stone-400 hover:text-stone-300"
        }
        onClick={handleLogout}
      >
        SALIR
      </Link>
    </div>
  );
};

export default NavLinks;
