import React, { useState } from "react";

const PhraseList = ({ phrases, loader }) => {
  console.log("phrases:", phrases);

  const [newPhrase, setNewPhrase] = useState({
    kor: "",
    rom: "",
    eng: "",
    status: "Not yet",
  });

  const handleChange = (e) => {
    console.log("e.target:", e.target);
    const { value } = e.target;
    setNewPhrase((prevPhrase) => ({
      ...prevPhrase,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/phrases/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPhrase),
      });

      if (response.ok) {
        alert("Phrase added successfully.");
        setNewPhrase({
          kor: "",
          rom: "",
          eng: "",
          status: "Not yet",
        });
        loader();
      } else {
        alert("Failed to add phrase. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding phrase:", error);
      alert("Failed to add phrase. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Add New Phrase</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Korean:
            <input type="text" name="kor" onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Romanization:
            <input type="text" name="rom" onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            English:
            <input type="text" name="eng" onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">Add Phrase</button>
      </form>

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
            <div key={phrase.id} className="phrase-row">
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
