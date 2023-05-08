import { useState, useRef } from "react";
import PreviewContent from "./PreviewContent";
import { createPost } from "@/pages/api/fetchs";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoText from "./InfoText";
import {
  faBold,
  faItalic,
  faLink,
  faImage,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";

const CreatePostForm = ({
  darkMode,
  username,
}: {
  darkMode: boolean;
  username: string;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const router = useRouter();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (preview) {
    return (
      <PreviewContent
        title={title}
        content={content}
        username={username}
        darkMode={darkMode}
        setPreview={setPreview}
      />
    );
  }

  const handleConfirm = async () => {
    const response = await createPost(title, content);
    console.log(response);
    if (response.success) {
      const titleWithSlash = await title.replaceAll(" ", "_");
      console.log(titleWithSlash);
      router.push(`/post/${titleWithSlash}`);
    }
  };

  const handleFormatButton = async (mdCode: string) => {
    const cursorPosition = textAreaRef.current?.selectionStart || 0;
    const newString =
      content.substring(0, cursorPosition) +
      mdCode +
      content.substring(cursorPosition, content.length);

    setContent(newString);

    await textAreaRef.current?.focus();

    textAreaRef.current?.setSelectionRange(
      cursorPosition + 2,
      cursorPosition + 2
    );
  };

  return (
    <form
      className={
        darkMode
          ? "bg-slate-900 p-2 md:p-8 flex flex-col text-white"
          : "bg-white p-2 md:p-8 flex flex-col border-2"
      }
    >
      <h2 className="text-xl font-bold mb-8 uppercase">Crear un nuevo post</h2>
      <label htmlFor="username">Ingresa el título:</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={
          darkMode
            ? "my-4 bg-slate-700 focus:outline-none p-1"
            : "my-4 focus:outline-none p-1 border-2 bg-stone-100"
        }
      />
      <div className="flex mt-4 justify-between items-center mb-1 relative">
        <label htmlFor="email">Ingresa el mensaje:</label>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          className="cursor-pointer hover:text-slate-600"
          onClick={() => {
            showInfo ? setShowInfo(false) : setShowInfo(true);
          }}
        />
        {showInfo ? <InfoText /> : <></>}
      </div>
      <div
        className={
          darkMode
            ? "bg-slate-700 border-t-2 border-l-2 border-r-2 border-slate-800 mt-2"
            : "bg-stone-100 border-t-2 border-l-2 border-r-2 border-stone-200 mt-2"
        }
      >
        <button
          className={
            darkMode
              ? "bg-slate-700 px-2 border-t-2 border-l-2 border-r-2 border-slate-800 hover:bg-slate-600"
              : "font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
          }
          onClick={(e) => {
            e.preventDefault();
            handleFormatButton("****");
          }}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          className={
            darkMode
              ? "bg-slate-700 px-2 border-t-2 border-l-2 border-r-2 border-slate-800 hover:bg-slate-600"
              : "font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
          }
          onClick={(e) => {
            e.preventDefault();
            handleFormatButton("**");
          }}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          className={
            darkMode
              ? "bg-slate-700 px-2 border-t-2 border-l-2 border-r-2 border-slate-800 hover:bg-slate-600"
              : "font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
          }
          onClick={(e) => {
            e.preventDefault();
            handleFormatButton("[<text>](<url>)");
          }}
        >
          <FontAwesomeIcon icon={faLink} />
        </button>
        <button
          className={
            darkMode
              ? "bg-slate-700 px-2 border-t-2 border-l-2 border-r-2 border-slate-800 hover:bg-slate-600"
              : "font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
          }
          onClick={(e) => {
            e.preventDefault();
            handleFormatButton("![<alt>](<url>)");
          }}
        >
          <FontAwesomeIcon icon={faImage} />
        </button>
        <button
          className={
            darkMode
              ? "bg-slate-700 px-2 border-t-2 border-l-2 border-r-2 border-slate-800 hover:bg-slate-600"
              : "font-bold border-r-2 border-b-2 px-2 hover:bg-slate-300"
          }
          onClick={(e) => {
            e.preventDefault();
            handleFormatButton("~~~\n<codigo>\n~~~");
          }}
        >
          <FontAwesomeIcon icon={faCode} />
        </button>
      </div>
      <textarea
        cols={40}
        ref={textAreaRef}
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={
          darkMode
            ? "mb-4 bg-slate-700 focus:outline-none  p-1 resize-none"
            : "mb-4 focus:outline-none  p-1 border-2 bg-stone-100 resize-none"
        }
      ></textarea>
      <button
        className="bg-rose-700 mt-2 p-2 text-white font-bold hover:bg-rose-600"
        onClick={() => setPreview(true)}
      >
        Previsualizar
      </button>
      <button
        className="bg-rose-500 mt-2 p-2 text-white font-bold hover:bg-rose-400"
        onClick={(e) => {
          e.preventDefault();
          handleConfirm();
        }}
      >
        Crear Post
      </button>
    </form>
  );
};

export default CreatePostForm;
