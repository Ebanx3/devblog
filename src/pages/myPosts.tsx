import Head from "next/head";
import { context } from "@/UserContext";
import Topic from "@/components/Topic";
import { useContext, useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Connection from "@/db/connection";
import { getMyPosts } from "./api/fetchs";
import formatDate from "@/formatDate";

const MyPosts = ({
  darkMode,
  handleDarkLight,
}: {
  darkMode: boolean;
  handleDarkLight: Function;
}) => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    getMyPosts().then((res) => {
      if (res.success) setMyPosts(res.data);
    });
  }, []);

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
          {myPosts.map((post: any) => (
            <Topic
              key={post.title}
              topic={{
                id: post._id,
                title: post.title,
                createdAt: formatDate(post.createdAt),
                user: post.username,
              }}
              darkMode={darkMode}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default MyPosts;
