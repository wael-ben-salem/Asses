import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Practice = () => {
   const [phrases, setPhrases] = useState([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    axios.get('/api/phrases') 
      .then(response => {
        setPhrases(response.data);
      })
      .catch(error => {
        console.error('Error fetching phrases:', error);
      });
  }, []);


  const filteredPhrases = phrases
    .filter(phrase => phrase.status !== "Got it")
    .sort((a, b) => {
      const order = { "Not yet": 0, "Almost": 1 };
      return order[a.status] - order[b.status];
    });


  const handleNext = () => {
    
    setCurrentIndex(prev => (prev + 1) % filteredPhrases.length);
    setShowTranslation(false);
  };
  

  const handleStatusClick = (status) => {
    if (!current) return;

    axios.patch(`/api/phrases/${current.id}`, { status })
      .then(() => {
        handleNext();
      })
      .catch(err => console.error('Erreur mise à jour statut:', err));
  };
  

  if (phrases.length === 0) {
    return <div>Loading phrases...</div>;
  }

  
  if (filteredPhrases.length === 0) {
    return (
      <div className="text-center mt-10 text-green-600 text-xl font-semibold">
      Félicitations, vous avez maîtrisé toutes les phrases !
      </div>
    );
  }

  const current = filteredPhrases[currentIndex];

  return (
    <div>
      <h1>Practice</h1>
      <div className="card">
        <div className="card-kor">{current.kor}</div>
        <div className="card-rom">{current.rom}</div>
        <div
          className="card-eng"
          onClick={() => setShowTranslation(!showTranslation)}
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
        >
          {showTranslation ? current.eng : "Reveal Translation"}
        </div>
        <button onClick={() => handleStatusClick('Not yet')}>Not yet</button>
        <button onClick={() => handleStatusClick('Almost')}>Almost</button>
        <button onClick={() => handleStatusClick('Got it')}>Got it</button>
      </div>
    </div>
  );
};

export default Practice;
