import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { context } from "@/UserContext";
import CreatePostForm from "@/components/CreatePostForm";

const CrearPost = ({ darkMode }: { darkMode: boolean }) => {
  const { user } = useContext(context);

  return (
    <>
      <Head>
        <title>nosApuntes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={
          darkMode ? "min-h-screen bg-slate-800" : "min-h-screen bg-stone-100"
        }
      >
        <Link href="/" className="absolute top-4 left-4">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={
              darkMode
                ? "text-white text-3xl hover:text-stone-300"
                : "text-3xl hover:text-stone-600"
            }
          />
        </Link>
        <div
          className={
            darkMode
              ? "flex justify-center items-center bg-slate-800 h-screen"
              : "flex justify-center items-center bg-stone-100 h-screen"
          }
        >
          {!user.username ? (
            <p className={darkMode ? "text-lg" : "text-lg"}>
              Debes estár logueado para crear un post, puedes hacerlo{" "}
              <Link href={"/login"} className="text-rose-500 font-bold">
                aquí
              </Link>
              .
            </p>
          ) : (
            <CreatePostForm darkMode={darkMode} username={user.username} />
          )}
        </div>
      </div>
    </>
  );
};

export default CrearPost;
