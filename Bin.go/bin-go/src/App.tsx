import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BingoPage from "./Components/BingoPage";
import SetupPage from "./Components/Setup/SetupPage";
// import BingoGrid from "./Components/BingoGrid";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BingoPage/>}/>
                <Route path="/setup" element={<SetupPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
