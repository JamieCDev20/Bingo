import { Socket } from 'socket.io-client'
import BingoGrid from './BingoGrid'

const BingoPage = ({socket} : {socket : Socket}) => {
  return (
        <>
            <header className="title">Bingo!</header>
            <BingoGrid socket={socket}/>
        </>
  )
}

export default BingoPage