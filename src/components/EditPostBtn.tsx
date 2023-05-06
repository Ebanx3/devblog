const EditPostBtn = ({
  handleClick,
  darkMode,
}: {
  handleClick: () => void;
  darkMode: boolean;
}) => {
  return (
    <button
      onClick={handleClick}
      className={
        darkMode
          ? "mr-4 border-2 py-1 px-4 text-sm rounded-md border-slate-600 hover:bg-slate-950"
          : "mr-4 border-2 py-1 px-4 text-sm rounded-md border-stone-400 hover:bg-stone-200"
      }
    >
      Modificar
    </button>
  );
};

export default EditPostBtn;
