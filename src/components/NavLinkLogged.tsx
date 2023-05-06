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
    <>
      <Link
        href={"/favs"}
        className={
          darkMode
            ? "mr-4 font-bold text-slate-100 hover:text-slate-300"
            : "mr-4 font-bold text-stone-600 hover:text-stone-400"
        }
      >
        <FontAwesomeIcon icon={faStar} className="mr-1" />
        FAVORITOS
      </Link>
      <Link
        href={"/myPosts"}
        className={
          darkMode
            ? "mr-4 font-bold text-slate-100 hover:text-slate-300"
            : "mr-4 font-bold text-stone-600 hover:text-stone-400"
        }
      >
        MIS POSTS
      </Link>
      <Link
        href={"/"}
        className={
          darkMode
            ? "mr-4 font-bold text-slate-400 hover:text-slate-200"
            : "mr-4 font-bold text-stone-400 hover:text-stone-300"
        }
        onClick={handleLogout}
      >
        SALIR
      </Link>
    </>
  );
};

export default NavLinks;
