import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BingoPage from "./Components/BingoPage";
import SetupPage from "./Components/Setup/SetupPage";
import { useRef } from "react";
import { io } from "socket.io-client";
// import BingoGrid from "./Components/BingoGrid";

function App() {

    let socket = useRef(io("http://18.130.62.61:8000", { transports: ["websocket"] }));
    // let socket = useRef(io("http://10.17.7.166:8000", { transports: ["websocket"] }));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BingoPage socket={socket.current}/>}/>
                <Route path="/setup" element={<SetupPage socket={socket.current}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
