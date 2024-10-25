import BingoCard, { bingoProps } from "./BingoCard";
import "./BingoGrid.css";
import { io } from "socket.io-client";

const bingoData: bingoProps[] = [
    {
        title: "Bingo Prompt 1",
    },
    {
        title: "Bingo Prompt 2",
    },
    {
        title: "Bingo Prompt 3",
    },
    {
        title: "Bingo Prompt 4",
    },
    {
        title: "Bingo Prompt 5",
    },
    {
        title: "Bingo Prompt 6",
    },
    {
        title: "Bingo Prompt 7",
    },
    {
        title: "Bingo Prompt 8 but its way longer than all the others for testing",
    },
    {
        title: "Bingo Prompt 9",
    },
];

const BingoGrid = () => {

    // const [gridData, setGridData] = useState(bingoData);
    

    const sock = io("localhost:5000/", {
        transports: ["websocket"]
    })
    

    sock.on("connect", () => {
        console.log("Connected");
    })



    return (
        <div className="bingo-grid">
            {bingoData.map((bd, index) => {
                return (
                    <BingoCard key={index} complete={bd.complete}>
                        {bd.title}
                    </BingoCard>
                );
            })}
        </div>
    );
};

export default BingoGrid;
