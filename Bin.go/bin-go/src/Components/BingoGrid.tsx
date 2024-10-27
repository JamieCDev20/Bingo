import { useEffect, useState } from "react";
import BingoCard, { bingoProps } from "./BingoCard";
import "./BingoGrid.css";
import { io } from "socket.io-client";

function onclick() {
}

const bingoData: bingoProps[] = [
    {
        title: "Bingo Prompt 1",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 2",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 3",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 4",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 5",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 6",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 7",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 8 but its way longer than all the others for testing",
        onclick: onclick
    },
    {
        title: "Bingo Prompt 9",
        onclick: onclick
    },
];

const BingoGrid = () => {

    const [gridData, setGridData] = useState(bingoData);

    const message = "message";
    const data_response = "data_response";
    const get_data = "get_data";
    const click = "clicked";

    let socket = io("http://192.168.178.23:8000", { transports: ["websocket"] });

    console.log("Created Bingo Grid");

    useEffect(() => {
        // socket = io("http://192.168.178.23:8000", { transports: ["websocket"] });

        socket.on("connect", () => {
            if (socket) {
                socket.emit(get_data);
            }
        });

        socket.on(message, (data) => {
            console.log("Message from server:", data);
        });

        socket.on(data_response, (data) => {
            console.log("Data received");
            setGridData(data.items);
        });

        return () => {
            console.log("Socket unmounted");
            socket?.disconnect();
        };
    }, []);

    function handle_click(num: number) {
        socket.emit(click, { data: num });
        console.log("Button Pressed");
    }

    return (
        <div className="bingo-grid">
            {gridData.map((bd, index) => {
                return (
                    <BingoCard key={index} complete={bd.complete} onclick={() => handle_click(index)}>
                        {bd.title}
                    </BingoCard>
                );
            })}
        </div>
    );
};

export default BingoGrid;
