import { useState } from 'react';
import './index.scss';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{counter}</h1>
        <button className="minus" onClick={() => setCounter(counter - 1)}>
          - Минус
        </button>
        <button className="plus" onClick={() => setCounter(counter + 1)}>
          Плюс +
        </button>
      </div>
    </div>
  );
}

export default App;
