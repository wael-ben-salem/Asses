import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Practice = () => {
   const [phrases, setPhrases] = useState([]);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('/api/phrases') 
      .then(response => {
        setPhrases(response.data);
      })
      .catch(error => {
        console.error('Error fetching phrases:', error);
      });
  }, []);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % phrases.length);
  };

  if (phrases.length === 0) {
    return <div>Loading phrases...</div>;
  }

  const current = phrases[currentIndex];

  return (
    <div>
      <h1>Practice</h1>
      <div className="card">
        <div className="card-kor">{current.kor}</div>
        <div className="card-rom">{current.rom}</div>
        <div className="card-eng">{current.eng}</div>

        <button onClick={handleNext}>Not yet</button>
        <button onClick={handleNext}>Almost</button>
        <button onClick={handleNext}>Got it</button>
      </div>
    </div>
  );
};

export default Practice;
