import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Main_Page from "./Components/Pages/Main_Page";
import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";
import InstallButton from "./Components/Pages/InstallButton/InstallButton";
import AnimatinTest from "./Components/Pages/AnimatinTest/AnimatinTest";
import AnimationTestNew from "./Components/Pages/AnimationTestNew/AnimationTestNew";
import Preloader from "./Components/Blocks/Preloader/Preloader";
import AnimationShow from "./Components/Blocks/AnimationShow/AnimationShow";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {/* <Preloader /> */}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isMobile ? <AnimationTestNew isMobile={isMobile} /> : <AnimatinTest />} />
          <Route path="animation" element={<AnimationShow />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>

      {/* Кнопка установки */}
      <InstallButton />
    </>
  )
}

export default App
