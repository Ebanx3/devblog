import Head from "next/head";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Connection from "@/db/connection";
// import InfoBox from "@/components/InfoBox";
import { useContext, useEffect, useState } from "react";
import TopicModel from "@/db/models/topic";
import Topic from "@/components/Topic";
import formatDate from "@/formatDate";
import { context } from "@/UserContext";
import CreateTopicBtn from "@/components/CreateTopicBtn";
import { searchInTopics } from "./api/fetchs";
import topic from "@/db/models/topic";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  darkMode,
  handleDarkLight,
  infoBox = "",
  data,
}: {
  darkMode: boolean;
  handleDarkLight: Function;
  infoBox: string;
  data: any[];
}) {
  // const [showInfo, setShowInfo] = useState(infoBox !== "");
  const [wordsToSearch, setWordsToSearch] = useState("");
  const [searchResultTopics, setSearchResultTopics] = useState([]);
  const { user } = useContext(context);

  useEffect(() => {
    if (wordsToSearch !== "") {
      searchInTopics(wordsToSearch).then((res) => {
        console.log(res.data);
        if (res.success) {
          setSearchResultTopics(res.data);
        }
      });
    }
  }, [wordsToSearch]);

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
          darkMode ? "min-h-screen bg-slate-800" : "min-h-screen bg-stone-200"
        }
      >
        <Nav
          darkMode={darkMode}
          handleDarkLight={handleDarkLight}
          setWordsToSearch={setWordsToSearch}
        />
        {/* {showInfo && <InfoBox info={infoBox} setShowInfo={setShowInfo} />} */}

        {wordsToSearch === "" ? (
          <main className="flex flex-col items-center mt-8 max-w-6xl m-auto">
            {user.username ? (
              <CreateTopicBtn textInside="Crear post" dir="/crearPost" />
            ) : (
              <></>
            )}
            {data.map((topic) => (
              <Topic topic={topic} key={topic.id} darkMode={darkMode} />
            ))}
          </main>
        ) : (
          <main className="flex flex-col items-center mt-8 max-w-6xl m-auto">
            {searchResultTopics.length === 0 && (
              <span
                className={
                  darkMode
                    ? "text-xl text-slate-50 font-bold mt-12"
                    : "text-xl text-stone-800 font-bold mt-12"
                }
              >
                No hay resultados para la busqueda:{" "}
                <span className={darkMode ? "text-rose-500" : "text-rose-600"}>
                  {wordsToSearch}
                </span>
              </span>
            )}
            {searchResultTopics.map((topic: any) => (
              <Topic topic={topic} key={topic._id} darkMode={darkMode} />
            ))}
          </main>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let connected = false;
  try {
    await Connection.getInstance();
    //traer aviso o noticia si la hay, crear endopoint para eso y retornarla infoBox
    const response = await TopicModel.find({ status: "public" });
    const data = response.map((elem) => {
      return {
        id: elem._id.toString(),
        title: elem.title,
        user: elem.username,
        likes: elem.likes.length,
        createdAt: formatDate(elem.createdAt.toString()),
      };
    });
    connected = true;
    return {
      props: {
        connected,
        infoBox:
          "El objetivo del sitio es guardar, encontrar y compartir mini tutoriales sobre desarrollo",
        data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        connected,
        infoBox: "Probando esto",
        data: [],
      },
    };
  }
}
