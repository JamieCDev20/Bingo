import "./BingoCard.css";
import check from "../assets/Checkmark.webp";

export interface bingoProps {
    title?: string;
    complete?: boolean;
    children?: string;
    center?: boolean;
    onclick: () => void
}

const BingoCard = ({ title, children, onclick, complete }: bingoProps) => {
    // const [complete, setComplete] = useState(false);

    return (
        <section
            className={"bingo-card" + (complete ? "-complete" : "")}
            onClick={onclick}
        >
            <p>{title}{children}</p>
            <img
                className={"check" + (complete ? "-complete" : "")}
                src={check}
            />
        </section>
    );
};

export default BingoCard;
