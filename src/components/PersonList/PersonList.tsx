import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {PersonStoreInterface} from "../../redux/store/storeType";
import {AppDispatch} from "../../redux/store/store";
import {useCallback, useEffect, useState} from "react";
import {getPeopleList, removePerson, removePersonFromState} from "../../redux/slices/personSlice";
import {Spinner} from "../Spinner/Spinner";
import {ErrorComponent} from "../ErrorComponent/ErrorComponent";
import {PersonActions} from "./PersonActions";
import Dialog from '@mui/material/Dialog';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


export const PersonList = () => {

    const listedPersons = useSelector((state: PersonStoreInterface) => state.personList.receivedData.personPositionData)
    const resStatus = useSelector((state: PersonStoreInterface) => state.personList.status)
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = React.useState(false);
    const [personId, setPersonId] = useState<string>(" ");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const deleteHandler = useCallback((id: string) => {
        handleClickOpen();
        setPersonId(id);
    }, [dispatch]);

    const deletePersonHandler = () => {
        dispatch(removePerson(personId));
        dispatch(removePersonFromState(personId));
        dispatch(getPeopleList());
        handleClose()
    }


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
    return (<>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Heads up!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete person?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deletePersonHandler} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

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
                                <TableCell align="right">
                                    <PersonActions personId={person.personId}
                                                   onDelete={() => deleteHandler(person.personId as string)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </TableContainer>
        </>
    );
}
