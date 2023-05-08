const InfoText = () => {
  return (
    <div className="absolute -right-40 text-sm w-36 z-30 bg-zinc-700 p-2 rounded-xl text-white">
      <p>
        Para darle formato al texto utilizamos markdown. Por más información
        sobre este formato visita{" "}
      </p>
      <a
        href="https://markdown.es/sintaxis-markdown/"
        target="_blank"
        rel="noreferrer"
        className="text-cyan-400 font-bold hover:text-cyan-300"
      >
        aquí
      </a>
    </div>
  );
};

export default InfoText;
