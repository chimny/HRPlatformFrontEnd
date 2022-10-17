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
import {useCallback, useEffect, useState} from "react";
import {getPeopleList, removePerson, removePersonFromState} from "../../redux/slices/personSlice";
import {Spinner} from "../Spinner/Spinner";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {PersonActions} from "./SinglePerson/PersonActions";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";




export const PersonList = () => {


    const listedPersons = useSelector((state: StoreInterface) => state.personList.receivedData.personPositionData)
    const dispatch = useDispatch<AppDispatch>();

    const resStatus = useSelector((state: StoreInterface) => state.personList.status)


    const [open, setOpen] = useState<boolean>(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };








    const deleteHandler = useCallback((id: string) => {
        dispatch(removePerson(id));
        dispatch(removePersonFromState({id}))
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
                        <TableCell align="right">Position</TableCell>
                        <TableCell align="right">Salary</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listedPersons.map((person) => (
                        <TableRow
                            key={person.personId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {person.name}
                            </TableCell>
                            <TableCell align="right">{person.surName}</TableCell>
                            <TableCell align="right">{person.position}</TableCell>
                            <TableCell align="right">{person.salary}</TableCell>
                            <TableCell align="right"><PersonActions person={person}
                                                                    onDelete={() => deleteHandler(person.personId as string)}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <Snackbar open={true} autoHideDuration={8000} onClose={handleClose}>

                <Alert onClose={handleClose} severity={undefined} sx={{width: '100%'}}>
                    {/*{severityStatus.message}*/}
                 test message
                </Alert>

            </Snackbar>


        </TableContainer>
    );
}
