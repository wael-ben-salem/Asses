import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormPrac = ({ onAdd }) => {
  const [kor, setKor] = useState('');
  const [rom, setRom] = useState('');
  const [eng, setEng] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
  axios.get('/api/categories')
    .then(res => setCategories(res.data))
    .catch(err => console.error('Erreur fetch catégories :', err));
}, []);



  const handleSubmit = (e) => {
    e.preventDefault();
  if (!kor || !rom || !eng || !selectedCategory) {
      setError('Tous les champs sont requis.');
      return;
    }

  axios.post('/api/phrases', { kor, rom, eng, category_id: selectedCategory })
      .then(() => {
        onAdd();  
        setKor('');
        setRom('');
        setEng('');
        setSelectedCategory('');
        setError('');
      })
      .catch(() => setError('Erreur lors de l\'ajout'));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
      <h2>Ajouter une nouvelle phrase</h2>
      <select
  value={selectedCategory}
  onChange={e => setSelectedCategory(e.target.value)}
>
  <option value="">-- Choisir une catégorie --</option>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>{cat.name}</option>
  ))}
</select>

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
