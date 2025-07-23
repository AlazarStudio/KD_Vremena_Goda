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

  const mainSectionRef = useRef(null);
  const collectionSectionRef = useRef(null);
  const historySectionRef = useRef(null);
  const flatsSectionRef = useRef(null);
  const elegantSectionRef = useRef(null);
  const contactsSectionRef = useRef(null);
  const consultationSectionRef = useRef(null);

  const [mainSectionScroll, setMainSectionScroll] = useState(0);
  const [collectionSectionScroll, setCollectionSectionScroll] = useState(0);
  const [historySectionScroll, setHistorySectionScroll] = useState(0);
  const [flatsSectionScroll, setFlatsSectionScroll] = useState(0);
  const [elegantSectionScroll, setElegantSectionScroll] = useState(0);
  const [contactsSectionScroll, setContactsSectionScroll] = useState(0);
  const [consultationSectionScroll, setConsultationSectionScroll] = useState(0);

  useEffect(() => {
    if (mainSectionRef.current) {
      const blockTop = mainSectionRef.current.offsetTop;
      setMainSectionScroll(blockTop);
    }
    if (collectionSectionRef.current) {
      const blockTop = collectionSectionRef.current.offsetTop;
      setCollectionSectionScroll(blockTop);
    }
    if (historySectionRef.current) {
      const blockTop = historySectionRef.current.offsetTop;
      setHistorySectionScroll(blockTop);
    }
    if (flatsSectionRef.current) {
      const blockTop = flatsSectionRef.current.offsetTop;
      setFlatsSectionScroll(blockTop);
    }
    if (elegantSectionRef.current) {
      const blockTop = elegantSectionRef.current.offsetTop;
      setElegantSectionScroll(blockTop);
    }
    if (contactsSectionRef.current) {
      const blockTop = contactsSectionRef.current.offsetTop;
      setContactsSectionScroll(blockTop);
    }
    if (consultationSectionRef.current) {
      const blockTop = consultationSectionRef.current.offsetTop;
      setConsultationSectionScroll(blockTop);
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>

      <div ref={mainSectionRef}>
        <Main_section mobileChange={true} />
      </div>

      <div ref={collectionSectionRef}>
        <Collection_section reveal={scrollY >= collectionSectionScroll - 500} />
      </div>

      <div ref={historySectionRef}>
        <History_section shown={scrollY >= historySectionScroll - 500} />
      </div>

      <div ref={flatsSectionRef}>
        <Flats_section
          scrollPos={scrollY}
          shown={scrollY >= flatsSectionScroll - 500}
          scale={scrollY >= flatsSectionScroll - 100 && scrollY <= flatsSectionScroll + 500}
          tower={scrollY >= flatsSectionScroll + 700}
          isMobile={isMobile}
          mobileChange={true}
        />
      </div>

      <div ref={elegantSectionRef}>
        <Elegant_section
          shown={scrollY >= elegantSectionScroll - 100}
          isMobile={isMobile}
          targetScroll={elegantSectionScroll}
        />
      </div>

      <div ref={contactsSectionRef}>
        <Contacts isMobile={isMobile} contactShow={scrollY >= contactsSectionScroll - 500} />
      </div>

      <div ref={consultationSectionRef}>
        <Consultation consultation={scrollY >= consultationSectionScroll - 500} />
      </div>
    </div >
  );
}

export default AnimationTestNew;
