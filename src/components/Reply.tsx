export type ReplyType = {
  replyId: string;
  content: string;
  createdAt: string;
  username: string;
};

const Reply = ({
  reply,
  darkMode,
}: {
  reply: ReplyType;
  darkMode: boolean;
}) => {
  return (
    <div
      className={
        darkMode
          ? "bg-slate-900 text-slate-100 my-4 p-6"
          : "bg-white my-4 p-6 text-stone-800"
      }
    >
      <div className="flex items-center justify-between">
        <span
          className={
            darkMode
              ? " text-slate-400 font-bold text-lg"
              : "text-stone-500 font-bold text-lg"
          }
        >
          {reply.username}
        </span>
        <span className={darkMode ? "text-slate-400" : "text-stone-400"}>
          {reply.createdAt}
        </span>
      </div>
      <p
        className={darkMode ? "mt-8" : "mt-8"}
        dangerouslySetInnerHTML={{ __html: reply.content }}
      ></p>
    </div>
  );
};

export default Reply;
