import React, {useState, useRef, useEffect} from "react";
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
    fetch("http://localhost:3000/kustuta-toode/" + index, {"method": "delete"})
        .then(res => res.json())
        .then(json => setTooted(json))
  }

  const lisa = () => {
      const uusToode = {
          "id": idRef.current.value,
          "nimi": nameRef.current.value,
          "hind": priceRef.current.value,
          "aktiivne": isActiveRef.current.checked
      };
    fetch(`http://localhost:3000/lisa-toode/`, {"method": "post", headers: {'Content-Type': 'application/json'}, "body": JSON.stringify(uusToode)})
        .then(res => res.json())
        .then(json => setTooted(json));
  }

  const dollariteks = () => {
      const kurss = 1.1;
      fetch("http://localhost:3000/hind-dollaritesse/" + kurss.toString(), {"method": "PATCH"})
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
