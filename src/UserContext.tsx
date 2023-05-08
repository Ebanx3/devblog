import { createContext, useState, useEffect, PropsWithChildren } from "react";

export type fav = {
  author: string;
  date: string;
  title: string;
  topicId: string;
};

export type User = {
  username: string;
  userId: string;
  rol: string;
  favs: [fav];
  urlAvatar: string | null;
};

interface Icontext {
  user: User;
  setUser: (user: User | {}) => void;
}

export const context = createContext({} as Icontext);
const Provider = context.Provider;

export const UserContext = ({ children }: PropsWithChildren) => {
  const userLS =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData") ?? "{}")
      : {};
  const [user, setUser] = useState(userLS);
  const [siteReady, setSiteReady] = useState(false);
  useEffect(() => {
    setSiteReady(true);
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData") || "{}"));
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return siteReady ? (
    <Provider value={{ user, setUser }}>{children}</Provider>
  ) : null;
};
