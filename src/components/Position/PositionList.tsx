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

    const [positionList,setPositionList] = useState<null | PositionDescriptionEntity[] >(null);

    const receiveHandler = async ()=>{
        const jsonData =  await fetch('http://localhost:3001/positions');
        const data = await jsonData.json()
        setPositionList(data.positions)
    }



    useEffect(()=>{
        receiveHandler()
    },[])


    if(positionList === null){
        return <Spinner/>
    }


    return (
        <TableContainer component={Paper} sx={{ margin: '16px auto',width: 1/2 }}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                         <StyledTableCell align="center"> Position</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {positionList.map((position) => (
                        <StyledTableRow
                            key={position.position}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {position.position}
                            </TableCell>
                            <TableCell align="center">{position.description}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    )

}

