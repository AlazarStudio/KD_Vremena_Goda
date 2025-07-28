import React, { useEffect, useState, useRef } from "react";
import classes from "./AnimationTestNew.module.css";
import Main_section from "../../Blocks/Main_section/Main_section";
import Collection_section from "../../Blocks/Collection_section/Collection_section";
import History_section from "../../Blocks/History_section/History_section";
import Flats_section from "../../Blocks/Flats_section/Flats_section";
import Contacts from "../../Blocks/Contacts/Contacts";
import Consultation from "../../Blocks/Consultation/Consultation";
import Presentation_section from "../../Blocks/Presentation_section/Presentation_section";
import Elegant_section_mobile from "../../Blocks/Elegant_section_mobile/Elegant_section_mobile";

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
  }, []);

  const mainSectionRef = useRef(null);
  const collectionSectionRef = useRef(null);
  const historySectionRef = useRef(null);
  const flatsSectionRef = useRef(null);
  const elegantSectionRef = useRef(null);
  const presentationSectionRef = useRef(null);
  const contactsSectionRef = useRef(null);
  const consultationSectionRef = useRef(null);

  const [mainSectionScroll, setMainSectionScroll] = useState(0);
  const [collectionSectionScroll, setCollectionSectionScroll] = useState(0);
  const [historySectionScroll, setHistorySectionScroll] = useState(0);
  const [flatsSectionScroll, setFlatsSectionScroll] = useState(0);
  const [elegantSectionScroll, setElegantSectionScroll] = useState(0);
  const [presentationSectionScroll, setPresentationSectionScroll] = useState(0);
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
    if (presentationSectionRef.current) {
      const blockTop = presentationSectionRef.current.offsetTop;
      setPresentationSectionScroll(blockTop);
    }
    if (consultationSectionRef.current) {
      const blockTop = consultationSectionRef.current.offsetTop;
      setConsultationSectionScroll(blockTop);
    }
  }, []);

  function getPercent(num, per = 40) {
    return Math.round(num * per / 100)
  }

  // console.log(scrollY)

  return (
    // <>123</>
    <div style={{ overflow: 'hidden' }}>

      <div ref={mainSectionRef}>
        <Main_section mobileChange={true} />
      </div>

      <div ref={collectionSectionRef}>
        <Collection_section reveal={scrollY >= collectionSectionScroll - getPercent(collectionSectionScroll)} />
      </div>

      <div ref={historySectionRef}>
        <History_section shown={scrollY >= historySectionScroll - getPercent(historySectionScroll)} />
      </div>

      <div ref={flatsSectionRef}>
        <Flats_section
          scrollPos={scrollY}
          shown={scrollY >= flatsSectionScroll - getPercent(flatsSectionScroll)}
          scale={scrollY >= flatsSectionScroll - getPercent(flatsSectionScroll, 10) && scrollY <= flatsSectionScroll + getPercent(flatsSectionScroll)}
          tower={scrollY >= flatsSectionScroll + getPercent(flatsSectionScroll, 10)}
          isMobile={isMobile}
          mobileChange={true}
        />
      </div>

      <div ref={elegantSectionRef}>
        <Elegant_section_mobile
          shown={scrollY >= elegantSectionScroll}
          isMobile={isMobile}
          targetScroll={elegantSectionScroll}
        />
      </div>

      <div ref={presentationSectionRef}>
        <Presentation_section presShow={scrollY >= presentationSectionScroll - getPercent(presentationSectionScroll, 10)} />
      </div>

      <div ref={contactsSectionRef}>
        <Contacts isMobile={isMobile} contactShow={scrollY >= contactsSectionScroll - getPercent(contactsSectionScroll, 10)} />
      </div>

      <div ref={consultationSectionRef}>
        <Consultation consultation={scrollY >= consultationSectionScroll - getPercent(consultationSectionScroll, 10)} />
      </div>
    </div >
  );
}

export default AnimationTestNew;
