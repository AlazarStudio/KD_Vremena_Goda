import React from "react";
import classes from "./RevealMask.module.css";
import History_section from "../../Blocks/History_section/History_section";
import Flats_section from "../../Blocks/Flats_section/Flats_section";

function RevealMask({ play }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.flats}>
        <History_section />
      </div>

      <div className={classes.history}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={`${i}-${play}`} // ⬅️ ключ зависит от play — перерендер
            className={`${classes.strip} ${play ? classes[`delay${i}`] : ""}`}
          >
            <Flats_section />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RevealMask;
