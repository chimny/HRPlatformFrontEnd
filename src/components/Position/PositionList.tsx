import {useEffect, useState} from "react";
import * as React from "react";
import {Spinner} from "../Spinner/Spinner";
import {PositionDescriptionEntity} from '../../../../backend/types/positionDescription';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";







export const PositionList = ()=>{

    const [positionList,setPositionList] = useState<null | PositionDescriptionEntity[] | 'error' >(null);

    const receiveHandler = async ()=>{
        try{
        const jsonData =  await fetch('http://localhost:3001/positions');
        const data = await jsonData.json()
            console.log(data);
         setPositionList(data)}

        catch(e){
            console.error(`unexpected error occured: ${e}`)
            setPositionList('error');
        }

    }



    useEffect(()=>{
        receiveHandler()
    },[])


    if(positionList === null){
        return <Spinner/>
    }

    if(positionList === 'error'){
        return <ErrorComponent/>
    }


    return (
        <TableContainer component={Paper} sx={{ margin: '16px auto',minWidth: 650 }}>
            <Table sx={{minWidth: 650}} >
                <TableHead >
                    <TableRow>
                         <TableCell align="center" sx={{borderBottom: 1,fontSize:32}}> Position</TableCell>
                        <TableCell align="center" sx={{borderBottom: 1,fontSize:32}}>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {positionList.map((position) => (
                        <TableRow
                            key={position.position}
                        >
                            <TableCell component="th" scope="row" align="center"  sx={{borderRight: 1,width:1/2,}}>
                                {position.position}
                            </TableCell>
                            <TableCell align="center">{position.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    )

}

