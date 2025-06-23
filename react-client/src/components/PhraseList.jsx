import React from 'react';

const PhraseList = () => (
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
          <div className="phrase-row">
            <div className="phrase-data">안녕하새요</div>
            <div className="phrase-data">an-nyeong-ha-se-yo</div>
            <div className="phrase-data">Hello</div>
            <div className="phrase-data">Got it</div>
          </div>
          <div className="phrase-row">
            <div className="phrase-data">이것은 하드 코딩된 자료이다</div>
            <div className="phrase-data">i-jeot-eun ha-deu ko-ding-duin ja-lyo-i-da</div>
            <div className="phrase-data">This is hard-coded data</div>
            <div className="phrase-data">Almost</div>
          </div>
          <div className="phrase-row">
            <div className="phrase-data">최선을 다하겠습니다</div>
            <div className="phrase-data">choe-seon-eul da-ha-gaess-seum-ni-da</div>
            <div className="phrase-data">I will do my best.</div>
            <div className="phrase-data">Got it</div>
          </div>
        </div>
      </div>
  </div>
);

export default PhraseList;