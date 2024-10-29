import './SetupPage.css'
import '../BingoGrid.css'
import SetupCard from './SetupCard'
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { bingoProps } from '../BingoCard';

const SetupPage = () => {

  const set_data = "set_data";
  const get_data = "get_data";
  const data_response = "data_response";

  let gridData : bingoProps[];

  let socket = io("http://192.168.178.23:8000", { transports: ["websocket"] });

  function cellChanged(id : number, val : string){
    gridData[id].title = val;
    
    socket.emit(set_data, { data: gridData });

    return;
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit(get_data);
    });

    socket.on(data_response, (data) => {
      gridData = data;
    })

    return () => {
      console.log("Socket unmounted");
      socket?.disconnect();
    };

  }, [])

  return (
    <section className='bingo-grid'>
      {
        [...Array<number>(25)].map((x, i) => {
          if(typeof(x) != typeof(0))
            return i != 12? <SetupCard id={i} cellChange={cellChanged}/> : <div>THE MIDDLE</div>
        })
      }
    </section>
  )
}

export default SetupPage