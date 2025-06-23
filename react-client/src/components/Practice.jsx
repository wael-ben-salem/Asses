import React, { useEffect, useState } from "react";
import axios from "axios";
import FormPractice from "../Form/FormPrac.jsx";

function sm2(quality, repetitions, interval, ef) {
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ef);
    repetitions++;
  }

  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < 1.3) ef = 1.3;

  return { repetitions, interval, ef };
}

const Practice = () => {
  const [phrases, setPhrases] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const total = phrases.length;
  const gotItCount = phrases.filter((p) => p.status === "Got it").length;
  const progress = total === 0 ? 0 : Math.round((gotItCount / total) * 100);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("/api/phrases")
      .then((response) => {
        setPhrases(response.data);
      })
      .catch((error) => {
        console.error("Error fetching phrases:", error);
      });
  }, []);

  const today = new Date();
  /*
  const filteredPhrases = phrases
    .filter(phrase => phrase.status !== "Got it")
    .sort((a, b) => {
      const order = { "Not yet": 0, "Almost": 1 };
      return order[a.status] - order[b.status];
    });

*/

  const filteredPhrases = phrases
    .filter((phrase) => new Date(phrase.dueDate) <= today)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const handleNext = () => {
    if (filteredPhrases.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredPhrases.length);
    setShowTranslation(false);
  };

  const fetchPhrases = () => {
    const query = selectedCategory ? `?category=${selectedCategory}` : "";
    axios
      .get("/api/phrases" + query)
      .then((res) => setPhrases(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchPhrases();
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur fetch catégories :", err));
  }, []);

  //step Eight :
  const current = filteredPhrases[currentIndex];

  const mapStatusToQuality = {
    "Not yet": 0,
    Almost: 3,
    "Got it": 5,
  };

  const handleStatusClick = (status) => {
    if (!current) return;

    const quality =
      mapStatusToQuality[status] !== undefined ? mapStatusToQuality[status] : 0;
    const { repetitions = 0, interval = 0, ef = 2.5 } = current;

    const result = sm2(quality, repetitions, interval, ef);

    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + result.interval);

    axios
      .patch(`/api/phrases/${current.id}`, {
        status,
        repetitions: result.repetitions,
        interval: result.interval,
        ef: result.ef,
        dueDate: nextDueDate.toISOString(),
      })
      .then(() => {
        fetchPhrases();
        handleNext();
      })
      .catch((err) => console.error("Erreur mise à jour statut:", err));
  };

  /*
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
  */

  if (phrases.length === 0) {
    return <div>Loading phrases...</div>;
  }

  if (filteredPhrases.length === 0) {
    return (
      <div className="text-center mt-10 text-green-600 text-xl font-semibold">
        Félicitations, vous avez maîtrisé toutes les phrases !
        <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
          Progression : {progress}% des phrases maîtrisées
        </div>
        <FormPractice onAdd={fetchPhrases} />
      </div>
    );
  }

  if (!current) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Practice</h1>
      <div style={{ marginBottom: "20px", fontWeight: "bold" }}>
        Progression : {progress}% des phrases maîtrisées
      </div>
      <div className="card">
        <div>
          <label htmlFor="categorySelect">Choisir une catégorie : </label>
          <select
            id="categorySelect"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Toutes catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="card-kor">{current.kor}</div>
        <div className="card-rom">{current.rom}</div>
        <div
          className="card-eng"
          onClick={() => setShowTranslation(!showTranslation)}
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {showTranslation ? current.eng : "Reveal Translation"}
        </div>
        <button onClick={() => handleStatusClick("Not yet")}>Not yet</button>
        <button onClick={() => handleStatusClick("Almost")}>Almost</button>
        <button onClick={() => handleStatusClick("Got it")}>Got it</button>
      </div>
      <FormPractice onAdd={fetchPhrases} />
    </div>
  );
};

export default Practice;
