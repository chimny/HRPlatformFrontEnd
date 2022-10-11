import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {StoreInterface} from "../../redux/store/storeType";
import {AppDispatch} from "../../redux/store/store";
import {useCallback, useEffect} from "react";
import {getPeopleList, removePerson, removePersonFromState} from "../../redux/slices/personSlice";
import {Spinner} from "../Spinner/Spinner";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {PersonActions} from "./SinglePerson/PersonActions";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {


    const listedPersons = useSelector((state: StoreInterface) => state.personList.receivedData.personPositionData)
    const dispatch = useDispatch<AppDispatch>();

    const resStatus = useSelector((state: StoreInterface) => state.personList.status)

    const deleteHandler = useCallback((id: string) => {
        //requests to remove it from the server
        dispatch(removePerson(id));
        //removes from redux state
        //following function doesnt work
        dispatch(removePersonFromState(id))
    }, [dispatch])

    useEffect(() => {
        dispatch(getPeopleList())
    }, [dispatch])


    if (resStatus === "pending") {
        return <Spinner/>
    }

    if (resStatus === "failed") {
        return (
            <ErrorComponent/>
        )
    }


    //table data below
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Surname</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listedPersons.map((person,index) => (
                        <TableRow
                            key={person.personId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {person.name}
                            </TableCell>
                            <TableCell align="right">{person.surName}</TableCell>
                                <TableCell align="right"><PersonActions person={person} onDelete={()=>deleteHandler(person.personId as string)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
