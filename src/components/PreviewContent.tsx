import React from "react";
import { useState, useEffect } from "react";
import formatText from "@/textFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const PreviewContent = ({
  title,
  content,
  username,
  darkMode,
  setPreview,
}: {
  title: string;
  content: string;
  username: string;
  darkMode: boolean;
  setPreview: (b: boolean) => void;
}) => {
  const [contentToShow, setContentToShow] = useState("");

  useEffect(() => {
    formatText(content).then((res) => setContentToShow(res));
  }, []);

  return (
    <div className="max-w-6xl m-auto flex-1">
      <div
        className={
          darkMode
            ? "bg-slate-900 text-slate-100 my-4 p-6 relative"
            : "bg-white my-4 p-6 text-stone-800 relative"
        }
      >
        <button className="float-right" onClick={() => setPreview(false)}>
          <FontAwesomeIcon
            icon={faXmark}
            className={
              darkMode
                ? "text-white text-3xl hover:text-stone-300"
                : "text-3xl hover:text-stone-600"
            }
          />
        </button>
        <div className="flex items-center justify-between">
          <span className="uppercase font-bold text-xl ">{title}</span>
        </div>
        <span
          className={
            darkMode
              ? " text-slate-400 font-bold text-lg"
              : "text-stone-500 font-bold text-lg"
          }
        >
          {username}
        </span>
        <p
          className={darkMode ? "mt-8" : "mt-8"}
          dangerouslySetInnerHTML={{ __html: contentToShow }}
        ></p>
        <div
          className={
            darkMode
              ? "flex items-center justify-end mt-4"
              : "flex items-center justify-end mt-4"
          }
        ></div>
      </div>
    </div>
  );
};

export default PreviewContent;
