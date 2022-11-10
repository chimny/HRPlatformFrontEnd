import React, {useEffect, useState} from "react";

import {Spinner} from "../Spinner/Spinner";
import {Alert, Button, Container, Snackbar, TextField} from "@mui/material";
import {useParams} from "react-router";
import {FormikUpdate} from "./FormikUpdate";
import {FormValues} from "../Formik/interface/formValues";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";

export const UpdatePerson = () => {

    const {personID} = useParams();


    const [loading, setLoading] = useState<boolean>(true);
    const [initValues, setInitValues] = useState<FormValues>({name: '', surname: '', salary: '', position: ''})


    const fetchData = async () => {

        try {
            const data = await fetch(`http://localhost:3001/personList/chosenPerson/${personID}`);
            const json = await data.json();
            const {chosenPersonData} = json;
            setLoading(false);
            setInitValues({
                name: chosenPersonData.name,
                position: chosenPersonData.position,
                salary: chosenPersonData.salary,
                surname: chosenPersonData.surName
            })
            console.log('render')
        } catch (e) {
            console.log(e)
            return (<ErrorComponent/>)
        }
    }


    useEffect(() => {
            fetchData()
                .catch(console.error);
        }, []
    )


    if (loading) {
        return (<Spinner/>)
    }


    return (
        <Container
            maxWidth="sm" sx={{padding: '20px'}}>

            <FormikUpdate initValues={initValues} personID={String(personID)}/>


        </ Container>
    );


}