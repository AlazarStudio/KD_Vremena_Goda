// src/Components/Pages/Non_Found_Page.jsx
import { useEffect } from "react";

export default function Non_Found_Page() {
  useEffect(() => {
    // обнулим заголовок и запретим индексацию на случай soft-404
    document.title = "404 — Страница не найдена";
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex, nofollow";
    document.head.appendChild(m);

    // полная загрузка статической 404 (юзер увидит красивую страницу)
    window.location.replace("/404.html");
  }, []);

  return null; // ничего не рисуем, сразу редирект
}