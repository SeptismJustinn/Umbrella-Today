import React, { useState } from "react";
import cornerStyle from "./Corner.module.css";
import AboutModal from "./AboutModal";

function AboutCorner() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <div
        className={`${cornerStyle.botLeft} ${cornerStyle.click}`}
        onClick={() => setShowAbout(true)}
      >
        About
      </div>
      {showDisclaimer && <AboutModal setShowAbout={setShowAbout} />}
    </>
  );
}

export default AboutCorner;
