import React, { useEffect, useState } from 'react';


const PhraseList = () => {
  const [phrases, setPhrases] = useState([]);

  useEffect(() => {
    fetch('/api/phrases')
      .then((res) => res.json())
      .then((data) => setPhrases(data))
      .catch((err) => console.error('Erreur fetch :', err));
  }, []);

  return (
    <div>
      <h1>Phrase List</h1>
      <div className="phrases">
        <div className="phrase-table">
          <div className="phrase-header phrase-row">
            <div className="phrase-data">Korean</div>
            <div className="phrase-data">Romanization</div>
            <div className="phrase-data">English</div>
            <div className="phrase-data">Status</div>
          </div>

          {phrases.map((phrase) => (
            <div className="phrase-row" key={phrase.id}>
              <div className="phrase-data">{phrase.kor}</div>
              <div className="phrase-data">{phrase.rom}</div>
              <div className="phrase-data">{phrase.eng}</div>
              <div className="phrase-data">{phrase.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhraseList;
