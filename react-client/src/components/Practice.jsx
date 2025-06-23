import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FormPractice from '../Form/FormPrac.jsx';





const Practice = () => {
   const [phrases, setPhrases] = useState([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const total = phrases.length;
  const gotItCount = phrases.filter(p => p.status === "Got it").length;
  const progress = total === 0 ? 0 : Math.round((gotItCount / total) * 100);

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
  if (filteredPhrases.length === 0) return; 
  setCurrentIndex(prev => (prev + 1) % filteredPhrases.length);
  setShowTranslation(false);
};
  
    const fetchPhrases = () => {
    axios.get('/api/phrases')
      .then(res => setPhrases(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchPhrases();
  }, []);

  const handleStatusClick = (status) => {
    if (!current) return;

    axios.patch(`/api/phrases/${current.id}`, { status })
      .then(() => {
          setPhrases(prev =>
          prev.map(p => p.id === current.id ? Object.assign({}, p, { status }) : p)
      );
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
      <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Progression : {progress}% des phrases maîtrisées
      </div>
      <FormPractice onAdd={fetchPhrases} />
    </div>
  );
}


  const current = filteredPhrases[currentIndex];
if (!current) {
  return <div>Chargement...</div>;  
}








  return (
    <div>
      <h1>Practice</h1>
      <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
      Progression : {progress}% des phrases maîtrisées
    </div>
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
      <FormPractice onAdd={fetchPhrases} />

    </div>
  );
};

export default Practice;
