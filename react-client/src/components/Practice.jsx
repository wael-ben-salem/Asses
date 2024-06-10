import React, { useState } from "react";

const Practice = ({ phrases }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  const handleNextPhrase = () => {
    setPhraseIndex((prevIndex) => prevIndex + 1);
  };

  const handleStatusClick = () => {
    handleNextPhrase();
  };

  if (phrases.length === 0) {
    return <div>No phrases available</div>;
  }
  const phrase = phrases[phraseIndex];

  return (
    <div>
      <h1>Practice</h1>
      <div className="card">
        <div className="card-kor">{phrase.kor}</div>
        <div className="card-rom">{phrase.rom}</div>
        <div className="card-eng">{phrase.eng}</div>
        <button onClick={handleStatusClick}>Not yet</button>
        <button onClick={handleStatusClick}>Almost</button>
        <button onClick={handleStatusClick}>Got it</button>
      </div>
    </div>
  );
};

export default Practice;
