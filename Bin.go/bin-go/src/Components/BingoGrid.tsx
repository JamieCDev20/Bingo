import { useEffect, useState } from "react";
import BingoCard, { bingoProps } from "./BingoCard";
import "./BingoGrid.css";
import { Socket } from "socket.io-client";

function onclick() {
}

const defaultMsg = "Disconnected";

const bingoData: bingoProps[] = [
    {
        title: defaultMsg,
        onclick: onclick
    },
    {
        title: defaultMsg,
        onclick: onclick
    },
    {
        title: defaultMsg,
        onclick: onclick
    },
    {
        title: defaultMsg,
        onclick: onclick
    },
    {
        title: defaultMsg,
        onclick: onclick
    },
];

const BingoGrid = ({socket} : {socket : Socket}) => {

    const [gridData, setGridData] = useState(bingoData);

    const message = "message";
    const data_response = "data_response";
    const get_data = "get_data";
    const click = "clicked";

    // let socket = io("http://192.168.178.23:8000", { transports: ["websocket"] });
    

    // console.log("Created Bingo Grid");

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
            socket.disconnect();
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
                    index === 12?
                    <BingoCard key={index} title={bd.title} complete={bd.complete} onclick={() => handle_click(index)}>
                        {bd.title}
                    </BingoCard>
                    :
                    <BingoCard key={index} title={"FREE SPACE"} complete={false} onclick={() => {}}/>
                );
            })}
        </div>
    );
};

export default BingoGrid;
