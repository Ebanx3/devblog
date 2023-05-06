import Link from "next/link";

const CreateTopicBtn = ({
  textInside,
  dir,
}: {
  textInside: string;
  dir: string;
}) => {
  return (
    <Link
      href={dir}
      className="bg-rose-600 text-white p-2 rounded-md  self-end uppercase font-bold mb-2 hover:bg-rose-500"
    >
      {textInside}
    </Link>
  );
};

export default CreateTopicBtn;
