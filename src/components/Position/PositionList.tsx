import {useEffect, useState} from "react";

export const PositionList = ()=>{

    const [positionList,setPositionList] = useState(null);

    const receiveHandler = async ()=>{
        const receivedData =  await fetch('http://localhost:3001/positions');

        console.log(await receivedData.json())}

    // useEffect(receiveHandler,[]);


    (receiveHandler)()

    return (
        <h1>Position list with description</h1>
    )

}