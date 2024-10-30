import "./BingoCard.css";
import check from "../assets/Checkmark.webp";

export interface bingoProps {
    title: string;
    complete?: boolean;
    center?: boolean;
    children? : string
    onclick: () => void
}

const BingoCard = ({ title, onclick, complete }: bingoProps) => {
    // const [complete, setComplete] = useState(false);

    return (
        <section
            className={"bingo-card" + (complete ? "-complete" : "")}
            onClick={onclick}
        >
            <p>{title}</p>
            <img
                className={"check" + (complete ? "-complete" : "")}
                src={check}
            />
        </section>
    );
};

export default BingoCard;
