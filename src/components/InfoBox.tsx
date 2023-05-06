import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const InfoBox = ({
  info,
  setShowInfo,
}: {
  info: string;
  setShowInfo: Function;
}) => {
  return (
    <div className="bg-sky-200 w-2/3 m-auto my-8 p-6 text-center relative">
      <button
        className="text-lg text-sky-900 absolute top-1 right-3 hover:text-sky-600"
        onClick={() => {
          setShowInfo(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <span className="text-xl font-bold text-sky-700">{info}</span>
    </div>
  );
};

export default InfoBox;
