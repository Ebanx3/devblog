const ReplyBtn = ({ handleOnClick }: { handleOnClick: () => void }) => {
  return (
    <button
      className="bg-rose-600 text-white text-sm md:text-md p-2 rounded-md  self-end uppercase font-bold my-4 hover:bg-rose-500"
      onClick={handleOnClick}
    >
      Responder
    </button>
  );
};

export default ReplyBtn;
