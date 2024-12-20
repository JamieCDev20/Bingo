import './SetupCard.css'
import '../BingoCard.css'

export interface setupProps {
    center?: boolean;
    cellChange: (id : number, val : string) => void;
    id : number;
    text : string
}

const SetupCard = ({center, cellChange, id, text} : setupProps) => {
    if(!center){
        return (
          <section className='bingo-card'>
              <input type='text' value={text} onChange={(val) => cellChange(id, val.target.value)} className='bingo-input' placeholder='Not filled in'></input>
          </section>
        )
    }
    else{
        <section className='bingo-card'>
            <p>FREE SQUARE</p>
        </section>
    }
}

export default SetupCard