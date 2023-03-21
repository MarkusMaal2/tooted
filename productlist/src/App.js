import { useRef } from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [prices, setPrices] = useState([]);
    const [chosenCountry, setChosenCountry] = useState("ee");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const startRef = useRef();
    const endRef = useRef();

    useEffect(() => {
        console.log(start + " " + end)
        if (start !== "" && end !== "") {
            fetch("http://localhost:3000/nord-pool-price?country=" + chosenCountry + "&start=" + start + "&end=" + end)
                .then(res => res.json())
                .then(json => {
                    setPrices(json);
                });
        }
    }, [chosenCountry, start, end]);

    function updateStart() {
        const startIso = new Date(startRef.current.value).toISOString();
        setStart(startIso);
    }

    function updateEnd() {
        const endIso = new Date(endRef.current.value).toISOString();
        setEnd(endIso);
    }

    return (
        <div>
            <header>
                <button onClick={() => setChosenCountry("fi")}>Soome</button>
                <button onClick={() => setChosenCountry("ee")}>Eesti</button>
                <button onClick={() => setChosenCountry("lv")}>Läti</button>
                <button onClick={() => setChosenCountry("lt")}>Leedu</button>
                <input ref={startRef} onChange={updateStart} type="datetime-local" />
                <input ref={endRef} onChange={updateEnd} type="datetime-local" />
            </header>
            <main>
            {prices.length > 0 &&
                <table>
                    <thead>
                    <th>Ajatempel</th>
                    <th>Hind</th>
                    </thead>
                    <tbody>
                    <div className="riik">{chosenCountry}</div>
                    {prices.map(data =>
                        <tr key={data.timestamp}>
                            <td>{new Date(data.timestamp * 1000).toISOString().split("T").join(" ").split("Z")[0].split(".")[0]}</td>
                            <td>{data.price}</td>
                        </tr>)}
                    </tbody>
                </table>}
            </main>
        </div>
    );
}

export default App;