import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Topic = {
  id: string;
  title: string;
  user: string;
  createdAt: string;
};

const Topic = ({ topic, darkMode }: { topic: Topic; darkMode: boolean }) => {
  const urlToLink = topic.title.replaceAll(" ", "_");
  return (
    <Link
      href={`/post/${urlToLink}`}
      className={
        darkMode
          ? "bg-slate-900 w-full p-4 inline-block hover:bg-black my-1"
          : "border-2 bg-white w-full p-4 inline-block hover:bg-stone-100 my-1"
      }
    >
      <p
        className={
          darkMode
            ? "text-xl font-bold text-slate-100 uppercase"
            : "text-xl font-bold uppercase text-stone-800"
        }
      >
        {topic.title}
      </p>
      <p
        className={
          darkMode
            ? "text-lg text-slate-400 font-bold my-2"
            : "text-lg text-stone-500 font-bold my-2"
        }
      >
        {topic.user}
      </p>
      <div className="flex justify-between mt-6">
        <span className={darkMode ? "text-slate-500" : "text-stone-500"}>
          {topic.createdAt}
        </span>
      </div>
    </Link>
  );
};

export default Topic;
