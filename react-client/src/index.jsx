import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Practice from "./components/Practice.jsx";
import PhraseList from "./components/PhraseList.jsx";

const App = () => {
  const [view, setView] = useState("phrases");
  const [phrases, setPhrases] = useState([]);
  const [loader, setLoader] = useState(false);

  const changeView = (option) => {
    setView(option);
  };
  const test = async () => {
    const response = await fetch("http://localhost:3000/api/phrases");
    const data = await response.json();
    setPhrases(data);
  };
  useEffect(() => {
    test();
  }, []);


  
  return (
    <div>
      <div className="nav">
        <span className="logo">Korean Tutor</span>
        <span
          className={view === "phrases" ? "nav-selected" : "nav-unselected"}
          onClick={() => changeView("phrases")}
        >
          Phrase List
        </span>
        <span
          className={view === "practice" ? "nav-selected" : "nav-unselected"}
          onClick={() => changeView("practice")}
        >
          Practice
        </span>
      </div>

      <div className="main">
        {view === "phrases" ? (
          <PhraseList phrases={phrases} loader={loader} />
        ) : (
          <Practice phrases={phrases}/>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
