import React from "react";
import { Route, Routes } from "react-router-dom";

import Main_Page from "./Components/Pages/Main_Page";
import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";
import InstallButton from "./Components/Pages/InstallButton/InstallButton";
import AnimatinTest from "./Components/Pages/AnimatinTest/AnimatinTest";
import AnimationTestNew from "./Components/Pages/AnimationTestNew/AnimationTestNew";
import Preloader from "./Components/Blocks/Preloader/Preloader";

function App() {
  return (
    <>
      <Preloader />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main_Page />} />
          <Route path="animation" element={<AnimatinTest />} />
          <Route path="animationTest" element={<AnimationTestNew />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>

      {/* Кнопка установки */}
      <InstallButton />
    </>
  )
}

export default App
