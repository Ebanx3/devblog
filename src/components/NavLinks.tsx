import Link from "next/link";

const NavLinks = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <>
      <Link
        href={"/signup"}
        className={
          darkMode
            ? "mr-4 font-bold text-slate-100 hover:text-slate-300"
            : "mr-4 font-bold text-stone-600 hover:text-stone-400"
        }
      >
        REGISTRATE
      </Link>
      <Link
        href={"/login"}
        className="font-bold text-lg p-2 px-4 bg-rose-500 text-white hover:bg-rose-400"
      >
        INGRESA
      </Link>
    </>
  );
};

export default NavLinks;
