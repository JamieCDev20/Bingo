import { useEffect, useState } from "react";
import BingoCard, { bingoProps } from "./BingoCard";
import "./BingoGrid.css";
import { io } from "socket.io-client";
import { Socket } from "socket.io";

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

    const [gridData, setGridData] = useState(bingoData);

    console.log("Created Bingo Grid");

    useEffect(() => {
        const socket = io("http://192.168.178.23:8000");

        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("message", (data) => {
            console.log("Message from server:", data);
        });

        socket.on("update", (data) => {
            setGridData(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);



    return (
        <div className="bingo-grid">
            {gridData.map((bd, index) => {
                return (
                    <BingoCard key={index} complete={bd.complete} onclick={() => { return; }}>
                        {bd.title}
                    </BingoCard>
                );
            })}
        </div>
    );
};

export default BingoGrid;
