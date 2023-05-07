import Head from "next/head";
import { context } from "@/UserContext";
import Topic from "@/components/Topic";
import { useContext } from "react";
import Nav from "@/components/Nav";

const Favs = ({
  darkMode,
  handleDarkLight,
}: {
  darkMode: boolean;
  handleDarkLight: Function;
}) => {
  const { user } = useContext(context);

  return (
    <>
      <Head>
        <title>nosApuntes</title>
        <meta
          name="description"
          content="Un espacio donde encontrar y compartir tutoriales sobre desarrollo"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={
          darkMode ? "min-h-screen bg-slate-800" : "min-h-screen bg-sky-100"
        }
      >
        <Nav
          darkMode={darkMode}
          handleDarkLight={handleDarkLight}
          setWordsToSearch={() => {}}
        />
        <main className="flex flex-col items-center mt-8 max-w-6xl m-auto">
          {user.favs.map((fav) => (
            <Topic
              key={fav.title}
              topic={{
                id: fav.topicId,
                title: fav.title,
                createdAt: fav.date,
                user: fav.author,
              }}
              darkMode={darkMode}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default Favs;
