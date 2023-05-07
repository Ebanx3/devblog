import Connection from "@/db/connection";
import Head from "next/head";
import TopicModel from "@/db/models/topic";
import PostModel from "@/db/models/posts";
import Nav from "@/components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faStar as faStarFull,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import formatDate from "@/formatDate";
import formatText from "@/textFormat";
import { useContext, useEffect, useState } from "react";
import { context, fav } from "@/UserContext";
import ReplyBtn from "@/components/ReplyBtn";
import ReplyForm from "@/components/ReplyForm";
import ReplyModel from "@/db/models/replies";
import Reply, { ReplyType } from "@/components/Reply";
import EditPostBtn from "@/components/EditPostBtn";
import EditPostForm from "@/components/EditPostForm";
import {
  addOrRemoveDislike,
  addOrRemoveFromFavs,
  addOrRemoveLike,
} from "../api/fetchs";

const Topic = ({
  topic,
  post,
  reps,
  darkMode,
  handleDarkLight,
}: {
  topic: any;
  post: any;
  reps: any;
  darkMode: boolean;
  handleDarkLight: Function;
}) => {
  const [content, setContent] = useState(post.content);
  const [contentToShow, setContentToShow] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [replies, setReplies] = useState(reps);

  const [likes, setLikes] = useState(topic.likes);
  const [dislikes, setDislikes] = useState(topic.dislikes);

  const { user, setUser } = useContext(context);
  const itsInFavs = (): boolean => {
    console.log(user);
    if (!user.favs) return false;
    const index = user.favs.findIndex(
      (elem: fav) => elem.title === topic.title
    );
    if (index < 0) return false;
    return true;
  };

  const [postInFav, setPostInFav] = useState(itsInFavs());

  const addReply = (reply: ReplyType) => {
    const newReplies = [...replies];
    newReplies.push(reply);
    setReplies(newReplies);
  };

  const handleLike = async () => {
    const response = await addOrRemoveLike(topic.id);
    if (response.success) {
      setLikes(response.data);
    }
  };

  const handleDislike = async () => {
    const response = await addOrRemoveDislike(topic.id);
    console.log(response);
    if (response.success) {
      setDislikes(response.data);
    }
  };

  const handleFav = async () => {
    const response = await addOrRemoveFromFavs(
      topic.username,
      topic.title,
      topic.createdAt,
      topic.id
    );
    console.log(response);
    if (response.success) {
      const newUser = { ...user };
      if (postInFav) {
        const index = newUser.favs.findIndex(
          (elem: fav) => elem.title === topic.title
        );
        newUser.favs.splice(index, 1);

        setPostInFav(false);
        setUser(newUser);
      } else {
        newUser.favs.push({
          author: topic.username,
          title: topic.title,
          date: topic.createdAt,
          topicId: topic.id,
        });
        setPostInFav(true);
        setUser(newUser);
      }
    }
  };

  useEffect(() => {
    formatText(content).then((res) => {
      setContentToShow(res);
    });
  }, [content, contentToShow]);

  return contentToShow !== "" ? (
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
          darkMode ? "min-h-screen bg-slate-800" : "min-h-screen bg-sky-100"
        }
      >
        <Nav
          darkMode={darkMode}
          handleDarkLight={handleDarkLight}
          setWordsToSearch={() => {}}
        />
        <div className="max-w-6xl m-auto flex flex-col">
          <div
            className={
              darkMode
                ? "bg-slate-900 text-slate-100 mt-4 sm:p-6 p-1"
                : "bg-white mt-4 sm:p-6 text-stone-800 p-1"
            }
          >
            <div className="flex items-center justify-between">
              <span className="uppercase font-bold md:text-xl ">
                {topic.title}
                <button
                  className="ml-4"
                  onClick={() => handleFav()}
                  disabled={!user.username}
                >
                  <FontAwesomeIcon
                    icon={postInFav ? faStarFull : faStar}
                    className="ml-1"
                  />
                </button>
              </span>

              <span
                className={
                  darkMode
                    ? "text-slate-400 text-sm md:text-md"
                    : "text-stone-400 text-sm md:text-md"
                }
              >
                {topic.createdAt}
              </span>
            </div>
            <span
              className={
                darkMode
                  ? " text-slate-400 font-bold md:text-lg"
                  : "text-stone-500 font-bold md:text-lg"
              }
            >
              {topic.username}
            </span>
            <div
              className={darkMode ? "mt-8 message" : "mt-8 message"}
              dangerouslySetInnerHTML={{ __html: contentToShow }}
            ></div>
            <div
              className={
                darkMode
                  ? "flex items-center justify-end mt-4"
                  : "flex items-center justify-end mt-4"
              }
            >
              {user.username &&
              (user.username === topic.username || user.rol != "user") ? (
                <EditPostBtn
                  handleClick={() => setShowEditForm(true)}
                  darkMode={darkMode}
                />
              ) : (
                <></>
              )}
              <button
                className={
                  darkMode
                    ? "text-lg mr-6 hover:text-slate-400"
                    : "text-lg mr-6 hover:text-stone-400"
                }
                onClick={() => handleLike()}
                disabled={!user.username}
              >
                {likes}
                <FontAwesomeIcon icon={faCheck} className="ml-1" />
              </button>
              <button
                className={
                  darkMode
                    ? "text-lg hover:text-slate-400"
                    : "text-lg hover:text-stone-400"
                }
                onClick={() => handleDislike()}
                disabled={!user.username}
              >
                {dislikes}
                <FontAwesomeIcon icon={faXmark} className="ml-1" />
              </button>
            </div>
          </div>

          {showEditForm && (
            <EditPostForm
              topicId={topic.id}
              previousContent={content}
              darkMode={darkMode}
              setShowEditForm={setShowEditForm}
              setContent={setContent}
            />
          )}

          {user.username && !showReplyForm && !showEditForm ? (
            <ReplyBtn handleOnClick={() => setShowReplyForm(true)} />
          ) : (
            <></>
          )}
          {showReplyForm && (
            <ReplyForm
              topicId={topic.id}
              darkMode={darkMode}
              setShowReplyForm={setShowReplyForm}
              addReply={addReply}
            />
          )}

          {replies.map((reply: ReplyType) => (
            <Reply key={reply.replyId} reply={reply} darkMode={darkMode} />
          ))}
        </div>
        <div className="h-8"></div>
      </div>
    </>
  ) : null;
};

export default Topic;

export async function getServerSideProps(data: any) {
  let connected = false;
  try {
    await Connection.getInstance();
    const title = data.query.postTitle.replaceAll("_", " ");
    const topic: any = await TopicModel.findOne({ title });
    const post = await PostModel.findById(topic.postId);
    const replies = await ReplyModel.find({ topicId: topic._id });
    const formatedTopic = {
      id: topic._id.toString(),
      username: topic.username,
      title: topic.title,
      likes: topic.likes.length,
      dislikes: topic.dislikes.length,
      createdAt: formatDate(topic.createdAt.toString()),
    };
    const formatedPost = {
      id: post._id.toString(),
      username: post.username,
      content: post.content,
    };
    const formatReplies = replies.map((reply: any) => {
      return {
        replyId: reply._id.toString(),
        username: reply.username,
        content: reply.content,
        createdAt: formatDate(reply.createdAt.toString()),
      };
    });
    return {
      props: {
        topic: formatedTopic,
        post: formatedPost,
        reps: formatReplies,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        connected,
        infoBox: "Probando esto",
        data: [],
      },
    };
  }
}
