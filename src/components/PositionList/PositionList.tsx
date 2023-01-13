import {useEffect, useState} from "react";
import * as React from "react";
import {Spinner} from "../Spinner/Spinner";
import {PositionDescriptionEntity} from '../../../../backend/types/positionDescription';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer, {TableContainerProps} from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {activeHost} from "../../Utils/activeHost";
import {StyledTableCell, StyledTableRow} from "../../Utils/styles/StyledTable";



export const PositionList : React.FC<TableContainerProps> = ()=>{

    const [positionList,setPositionList] = useState<null | PositionDescriptionEntity[] | 'error' >(null);





    useEffect(()=>{
        const receiveHandler = async ()=>{
            try{
                const jsonData =  await fetch(`${activeHost}/positions`);
                const data = await jsonData.json()
                console.log(data);
                setPositionList(data)}

            catch(e){
                console.error(`unexpected error occurred: ${e}`)
                setPositionList('error');
            }

        }


        receiveHandler()
            .catch(console.error)
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
                         <StyledTableCell align="center" sx={{fontSize:32}}> Position</StyledTableCell>
                        <StyledTableCell align="center" sx={{fontSize:32}}>Description</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {positionList.map((position) => (
                        <StyledTableRow
                            key={position.position}
                        >
                            <TableCell component="th" scope="row" align="center"  sx={{width:1/2,}}>
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

