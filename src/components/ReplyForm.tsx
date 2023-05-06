import { addReplyToTopic } from "@/pages/api/fetchs";
import { useContext, useState } from "react";
import { ReplyType } from "./Reply";
import { context } from "@/UserContext";

const ReplyForm = ({
  topicId,
  darkMode,
  setShowReplyForm,
  addReply,
}: {
  topicId: string;
  darkMode: boolean;
  setShowReplyForm: (value: boolean) => void;
  addReply: (reply: ReplyType) => void;
}) => {
  const [content, setContent] = useState("");

  const { user } = useContext(context);

  const handleConfirm = async () => {
    const response = await addReplyToTopic(topicId, content);
    console.log(response);
    if (response.success) {
      addReply({
        username: user.username,
        content,
        createdAt: "Justo ahora",
        replyId: "",
      });
      setShowReplyForm(false);
    }
  };

  return (
    <form
      className={
        darkMode
          ? "bg-slate-900 md:p-8 p-2 flex flex-col text-white"
          : "bg-white md:p-8 p-2 flex flex-col border-2"
      }
    >
      <h2 className="text-lg font-bold uppercase">Responder al post</h2>
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
      <div className="self-end">
        <button
          className="bg-rose-700 mt-2 p-2 text-white font-bold hover:bg-rose-600 mr-4 text-sm md:text-md"
          onClick={(e) => {
            e.preventDefault();
            setShowReplyForm(false);
          }}
        >
          Cancelar
        </button>
        <button
          className="bg-rose-500 mt-2 p-2 text-white font-bold hover:bg-rose-400 text-sm md:text-md"
          onClick={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          Responder
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;
