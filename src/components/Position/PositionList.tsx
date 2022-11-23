import {useEffect, useState} from "react";
import * as React from "react";
import {Spinner} from "../Spinner/Spinner";
import {PositionDescriptionEntity} from '../../../../backend/types/positionDescription';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {StyledCenteredDiv} from "../../Utils/Components/StyledCenteredDiv";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));





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
                            // sx={{'&:nth-child(even) td': {backgroundColor: 'lightgray'}}}
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

