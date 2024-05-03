import React, { useState } from 'react';
import './index.scss';
import ModalWindow from './components/modalWindow';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="App">
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="open-modal-btn">
        ✨ Открыть окно
      </button>
      <ModalWindow open={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
