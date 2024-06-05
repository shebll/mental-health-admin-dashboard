"use client";
import React, { useEffect, useState } from "react";
type theme = "dark" | "light" | "";
export const Theme = () => {
  const [theme, setTheme] = useState<theme>("");
  const ThemeSwitchHandle = () => {
    if (theme === "light") {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  const detectTheme = () => {
    const matches = window.matchMedia("(prefers-color-scheme: dark)");
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        if (matches) {
          setTheme("dark");
          window.localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
        } else {
          setTheme("light");
          window.localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
        }
      });
    if (matches.matches) {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    const themeFormLocal = window.localStorage.getItem("theme") as theme | null;
    if (themeFormLocal) {
      if (themeFormLocal == "dark") {
        setTheme(themeFormLocal);
        document.documentElement.classList.add("dark");
      } else {
        setTheme(themeFormLocal);
        document.documentElement.classList.remove("dark");
      }
    } else {
      console.log("no local");
      detectTheme();
    }
    return window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", ({ matches }) => {
        if (matches) {
          setTheme("dark");
          window.localStorage.setItem("theme", "dark");
          document.documentElement.classList.add("dark");
        } else {
          setTheme("light");
          window.localStorage.setItem("theme", "light");
          document.documentElement.classList.remove("dark");
        }
      });
  }, []);

  return (
    <button
      className="
      fixed bottom-8 right-10"
      onClick={ThemeSwitchHandle}
      tabIndex={0}
    >
      {theme === "" ? "☁️" : theme === "light" ? "🌤️" : "🌙"}
    </button>
  );
};
