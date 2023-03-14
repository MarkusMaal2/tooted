import React, {useState, useRef, useEffect} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [tooted, setTooted] = useState([]);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const isActiveRef = useRef();

  useEffect(() => {
    fetch("http://localhost:3000/tooted")
        .then(res => res.json())
        .then(json => setTooted(json));
  }, []);

  const kustuta = (index) => {
    fetch("http://localhost:3000/kustuta-toode/" + index)
        .then(res => res.json())
        .then(json => setTooted(json))
  }

  const lisa = () => {
    fetch(`http://localhost:3000/lisa-toode/${idRef.current.value}/${nameRef.current.value}/${priceRef.current.value}/${isActiveRef.current.value}`)
        .then(res => res.json())
        .then(json => setTooted(json));
  }

  const dollariteks = () => {
      const kurss = 1.1;
      fetch("http://localhost:3000/hind-dollaritesse/" + kurss)
          .then(res => res.json())
          .then(json => setTooted(json));

  }

  return (
      <div className="App">
        <div className="add">
            <label>ID</label> <br />
            <input ref={idRef} type="number" /> <br />
            <label>Nimi</label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Hind</label> <br />
            <input ref={priceRef} type="number" /> <br />
            <label>Aktiivne</label> <br />
            <input ref={isActiveRef} type="checkbox" /> <br />
            <button onClick={() => lisa()}>Lisa</button>
        </div>
        {tooted.map((toode, index) =>
            <div key={Math.random()} className="product">
              <div>{toode._id}</div>
              <div>{toode._name}</div>
              <div>{toode.price}</div>
              <button onClick={() => kustuta(index)}>X</button>
            </div>)}
          <button id="dollarid" onClick={() => dollariteks()}>Muuda dollariteks</button>
      </div>
  );
}

export default App;
