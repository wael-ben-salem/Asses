import React, { useState } from "react";

const Practice = ({ phrases }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const handleNextPhrase = () => {
    setPhraseIndex((prevIndex) => prevIndex + 1);
    setShowTranslation(false);
  };

  const handleStatusClick = () => {
    handleNextPhrase();
  };
  const handleToggleTranslation = () => {
    setShowTranslation(!showTranslation);
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
        {showTranslation ? (
          <div className="card-eng">{phrase.eng}</div>
        ) : (
          <div className="card-eng">-------</div>
        )}
        <button onClick={handleNextPhrase}>Next Phrase</button>
        <button onClick={handleToggleTranslation}>
          {showTranslation ? "Hide Translation" : "Reveal Translation"}
        </button>
        <button onClick={handleStatusClick}>Not yet</button>
        <button onClick={handleStatusClick}>Almost</button>
        <button onClick={handleStatusClick}>Got it</button>
      </div>
    </div>
  );
};

export default Practice;
