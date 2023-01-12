import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses } from '@mui/material/TableCell';
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
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle, styled} from "@mui/material";



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


    //function triggered after clicking delete button in person list view
    const deleteHandler = useCallback((id: string) => {
        handleClickOpen();
        setPersonId(id);
    }, []);


    //function to delete user in confirmation view after clicking delete button
    const deletePersonHandler = () => {
        dispatch(removePerson(personId));
        dispatch(removePersonFromState(personId));
        dispatch(getPeopleList());
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
                    <TableHead >
                        <TableRow sx={{color:'red'}}>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Surname</StyledTableCell>
                            <StyledTableCell align="right">Position</StyledTableCell>
                            <StyledTableCell align="right">Salary</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listedPersons.map((person) => (
                            <StyledTableRow
                                key={person.personId}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {person.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{person.surName}</StyledTableCell>
                                <StyledTableCell align="right">{person.position}</StyledTableCell>
                                <StyledTableCell align="right">{person.salary}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <PersonActions personId={person.personId}
                                                   onDelete={() => deleteHandler(person.personId as string)}/>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>


            </TableContainer>
        </>
    );
}
