import './SetupPage.css'
import '../BingoGrid.css'
import SetupCard from './SetupCard'
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { bingoProps } from '../BingoCard';

const SetupPage = () => {

  const set_data = "set_data";
  const get_data_setup = "get_data-setup";
  const data_response_setup = "data_response-setup";

  const emptyGridData : bingoProps[] = [
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
    {title: "", onclick: () => {}},
  ]

  const [gridData, setGridData] = useState(emptyGridData)


  // let socket = io("http://192.168.178.23:8000", { transports: ["websocket"] });
  let socket = io("http://10.17.7.166:8000", { transports: ["websocket"] });

  function cellChanged(id : number, val : string){
    setGridData(prevData => 
      prevData.map((input, i) =>
        i === id ? {...input, title: val} : input
      )
    );
    console.log("Sending data")
    socket.emit(set_data, { data: gridData });

    return;
  }

  // function resetGridData(){
  //   setGridData(prevData => 
  //     prevData.map(input => 
  //     input.id > -1 ? {...input, complete: false} : input
  //     )
  //   )
  // }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit(get_data_setup);
    });

    socket.on(data_response_setup, (data) => {
      console.log("Received data");
      console.log(data.items);
      setGridData(data.items);
    })

    return () => {
      console.log("Socket unmounted");
      socket?.disconnect();
    };

  }, [])

  return (
    <section className='bingo-grid'>
      {
        gridData.map((x, i) => {
            return i != 12? 
            <SetupCard key={i} id={i} cellChange={cellChanged} text={x.title}/> : <p>MIDDLE</p>
            // <BingoCard id={12} onclick={resetGridData} title='RESET PROGRESS'/>
        })
      }
    </section>
  )
}

export default SetupPage