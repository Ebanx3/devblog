import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { login } from "./api/fetchs";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { User, context } from "@/UserContext";

const Login = ({ darkMode }: { darkMode: boolean }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setUser } = useContext(context);

  const handleLogin = async () => {
    const response = await login(username, password);
    console.log(response);
    if (response.success) {
      setUser((response.data as User) || {});
      router.push("/");
    }
  };

  return (
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
          darkMode
            ? "flex justify-center items-center bg-slate-800 h-screen"
            : "flex justify-center items-center bg-sky-100 h-screen"
        }
      >
        <Link href="/" className="absolute top-4 left-4">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={
              darkMode
                ? "text-white text-3xl hover:text-stone-300"
                : "text-3xl hover:text-stone-600"
            }
          />
        </Link>
        <form
          className={
            darkMode
              ? "bg-slate-900 p-8 flex flex-col text-white"
              : "bg-white p-8 flex flex-col border-2"
          }
        >
          <label htmlFor="username">Ingresa tu nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={
              darkMode
                ? "my-4 bg-slate-700 focus:outline-none text-center p-1"
                : "my-4 focus:outline-none text-center p-1 border-2 bg-stone-100"
            }
          />
          <label htmlFor="password">Ingresa tu contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              darkMode
                ? "my-4 bg-slate-700 focus:outline-none text-center p-1"
                : "my-4 focus:outline-none text-center p-1 border-2 bg-stone-100"
            }
          />
          <button
            className="bg-rose-500 mt-2 p-2 text-white font-bold hover:bg-rose-400"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Ingresar
          </button>
          <span className={darkMode ? "text-white mt-4" : "mt-4"}>
            No tienes una cuenta?
          </span>
          <span>
            Puedes registrarte{" "}
            <Link
              href={"/signup"}
              className="font-bold text-rose-500 hover:text-rose-300"
            >
              aquí
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
