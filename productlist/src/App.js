import React, {useState, useEffect} from "react";
import './App.css';

function App() {
    const [fi, setFi] = useState([]);
    const [ee, setEe] = useState([]);
    const [lv, setLv] = useState([]);
    const [lt, setLt] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/nord-pool-price")
            .then(res => res.json())
            .then(json => {
                setFi(json.data.fi)
                setEe(json.data.ee)
                setLv(json.data.lv)
                setLt(json.data.lt)
            })
    }, [])

    const getDate = (timeStamp) => {
        return new Date(timeStamp * 1000).toISOString().split("T").join(" ").replace("Z", "").split(".")[0]
    }

    const getPrice = (price) => {
        return price.toString() + "€"
    }

    return (
        <div className="App">
            <table>
                <thead>
                    <th>Ajatempel</th>
                    <th>Hind</th>
                </thead>
                <tbody>
                    <div className="riik">Soome</div>
                    {fi.map(data =>
                        <tr key={data.timestamp}>
                            <td>{getDate(data.timestamp)}</td>
                            <td>{getPrice(data.price)}</td>
                        </tr>
                    )}
                    <div className="riik">Eesti</div>
                    {ee.map(data =>
                        <tr key={data.timestamp}>
                            <td>{getDate(data.timestamp)}</td>
                            <td>{getPrice(data.price)}</td>
                        </tr>
                    )}
                    <div className="riik">Läti</div>
                    {lt.map(data =>
                        <tr key={data.timestamp}>
                            <td>{getDate(data.timestamp)}</td>
                            <td>{getPrice(data.price)}</td>
                        </tr>
                    )}
                    <div className="riik">Leedu</div>
                    {lv.map(data =>
                        <tr key={data.timestamp}>
                            <td>{getDate(data.timestamp)}</td>
                            <td>{getPrice(data.price)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default App;
