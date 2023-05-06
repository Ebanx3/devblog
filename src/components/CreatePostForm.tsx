import { useState } from "react";
import PreviewContent from "./PreviewContent";
import { createPost } from "@/pages/api/fetchs";
import { useRouter } from "next/router";

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
  const router = useRouter();

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
      <label htmlFor="email">Ingresa el mensaje:</label>
      <textarea
        cols={40}
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={
          darkMode
            ? "my-4 bg-slate-700 focus:outline-none  p-1 resize-none"
            : "my-4 focus:outline-none  p-1 border-2 bg-stone-100 resize-none"
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
