import { UserContext } from "@/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkLight = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true);
  };

  return (
    <UserContext>
      <Component
        {...pageProps}
        darkMode={darkMode}
        handleDarkLight={handleDarkLight}
      />
    </UserContext>
  );
}
