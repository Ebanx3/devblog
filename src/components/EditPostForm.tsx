import { useState } from "react";
import { updateTopic } from "@/pages/api/fetchs";

const EditPostForm = ({
  topicId,
  previousContent,
  darkMode,
  setShowEditForm,
  setContent,
}: {
  topicId: string;
  previousContent: string;
  darkMode: boolean;
  setShowEditForm: (value: boolean) => void;
  setContent: (value: string) => void;
}) => {
  const [contentt, setContentt] = useState(previousContent);

  const handleConfirm = async () => {
    const response = await updateTopic(topicId, contentt);
    if (response.success) {
      setContentt(contentt);
      setContent(contentt);
      setShowEditForm(false);
    }
  };

  return (
    <form
      className={
        darkMode
          ? "bg-slate-900 p-8 flex flex-col text-white mb-4"
          : "bg-white p-8 flex flex-col border-2 mb-4"
      }
    >
      <textarea
        cols={40}
        rows={8}
        value={contentt}
        onChange={(e) => setContentt(e.target.value)}
        className={
          darkMode
            ? "my-4 bg-slate-700 focus:outline-none  p-1 resize-none"
            : "my-4 focus:outline-none  p-1 border-2 bg-stone-100 resize-none"
        }
      ></textarea>
      <div className="self-end">
        <button
          className="bg-rose-700 mt-2 p-2 text-white font-bold hover:bg-rose-600 mr-4"
          onClick={(e) => {
            e.preventDefault();
            setShowEditForm(false);
          }}
        >
          Cancelar
        </button>
        <button
          className="bg-rose-500 mt-2 p-2 text-white font-bold hover:bg-rose-400"
          onClick={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          Modificar
        </button>
      </div>
    </form>
  );
};

export default EditPostForm;
