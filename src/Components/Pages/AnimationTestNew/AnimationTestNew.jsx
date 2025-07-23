import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimationTestNew.module.css";
import Main_section from "../../Blocks/Main_section/Main_section";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import History_section from "../../Blocks/History_section/History_section";
import Flats_section from "../../Blocks/Flats_section/Flats_section";
import Elegant_section from "../../Blocks/Elegant_section/Elegant_section";
import Contacts from "../../Blocks/Contacts/Contacts";
import Consultation from "../../Blocks/Consultation/Consultation";

function AnimationTestNew({ isMobile }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [viewport.height,]);

  // console.log(scrollY)

  const sectionRef = useRef(null);
  const [targetScroll, setTargetScroll] = useState(0);

  useEffect(() => {
    if (sectionRef.current) {
      const blockTop = sectionRef.current.offsetTop;
      setTargetScroll(blockTop);
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Main_section mobileChange={true} />
      <Collection_section reveal={scrollY >= 500} />
      <History_section shown={scrollY >= 1000} />
      <Flats_section
        scrollPos={scrollY}
        shown={scrollY >= 2300}
        scale={scrollY >= 2600 && scrollY <= 3500}
        tower={scrollY >= 3500}
        isMobile={isMobile}
        mobileChange={true}
      />
      <div ref={sectionRef}>
        <Elegant_section
          shown={scrollY >= 4500}
          isMobile={isMobile}
          targetScroll={targetScroll}
        />
      </div>
      <Contacts isMobile={isMobile} contactShow={scrollY >= 500} />
      <Consultation consultation={scrollY >= 5500} />
    </div>
  );
}

export default AnimationTestNew;
