import React, { useState, useEffect } from "react";

const Practice = ({ phrases }) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Calculate progress percentage
    const gotItCount = phrases.filter((phrase) => phrase.status === "Got it").length;
    const totalPhrases = phrases.length;
    const progressPercentage = (gotItCount / totalPhrases) * 100;
    setProgress(progressPercentage);

    // Check if all phrases are marked as "Got it"
    const allGotIt = phrases.every((phrase) => phrase.status === "Got it");
    if (allGotIt) {
      setCompleted(true);
    }
  }, [phrases]);

  const prioritizePhrases = (a, b) => {
    if (a.status === "Got it") return 1;
    if (b.status === "Got it") return -1;
    if (a.status === "Not yet" && b.status === "Almost") return -1;
    if (a.status === "Almost" && b.status === "Not yet") return 1;
    return 0;
  };

  const handleNextPhrase = () => {
    const nextIndex = phrases.findIndex((phrase, index) => {
      return index > phraseIndex && phrase.status !== "Got it";
    });

    if (nextIndex === -1) {
      // If no more phrases to practice
      setCompleted(true);
    } else {
      setPhraseIndex(nextIndex);
      setShowTranslation(false);
    }
  };

  const handleToggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleStatusClick = async (status) => {
    try {
      const phraseId = phrases[phraseIndex].id;
      const response = await fetch(`/api/phrases/${phraseId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      handleNextPhrase();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (completed) {
    return <div>Congratulations! You've mastered all the phrases.</div>;
  }

  if (phrases.length === 0) {
    return <div>No phrases available</div>;
  }

  // Sort phrases based on priority
  const sortedPhrases = [...phrases].sort(prioritizePhrases);
  const phrase = sortedPhrases[phraseIndex];

  return (
    <div>
      <h1>Practice</h1>
      <div className="progress-bar">
        Progress: {progress.toFixed(2)}%
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
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
        <button onClick={() => handleStatusClick("Not yet")}>Not yet</button>
        <button onClick={() => handleStatusClick("Almost")}>Almost</button>
        <button onClick={() => handleStatusClick("Got it")}>Got it</button>
      </div>
    </div>
  );
};

export default Practice;
