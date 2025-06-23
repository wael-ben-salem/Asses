import React, { useState } from 'react';
import axios from 'axios';

const FormPrac = ({ onAdd }) => {
  const [kor, setKor] = useState('');
  const [rom, setRom] = useState('');
  const [eng, setEng] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kor || !rom || !eng) {
      setError('Tous les champs sont requis.');
      return;
    }

    axios.post('/api/phrases', { kor, rom, eng })
      .then(() => {
        onAdd();  // rafraîchir la liste des phrases
        setKor('');
        setRom('');
        setEng('');
        setError('');
      })
      .catch(() => setError('Erreur lors de l\'ajout'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
      <h2>Ajouter une nouvelle phrase</h2>
      <input
        type="text"
        value={kor}
        onChange={e => setKor(e.target.value)}
        placeholder="Korean"
      />
      <input
        type="text"
        value={rom}
        onChange={e => setRom(e.target.value)}
        placeholder="Romanization"
      />
      <input
        type="text"
        value={eng}
        onChange={e => setEng(e.target.value)}
        placeholder="English"
      />
      <button type="submit">Ajouter</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default FormPrac;
