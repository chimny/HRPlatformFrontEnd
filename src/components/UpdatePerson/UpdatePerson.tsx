import React, {useCallback,useEffect, useState} from "react";

import {Spinner} from "../Spinner/Spinner";
import {Container} from "@mui/material";
import {useParams} from "react-router";
import {FormikUpdate} from "./FormikUpdate";
import {formValues} from "../Formik/interface/formValues";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";
import {activeHost} from "../../Utils/activeHost";

export const UpdatePerson = () => {

    const {personID} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [initValues, setInitValues] = useState<formValues>({name: '', surname: '', salary: '', position: ''})



    const fetchData = useCallback(async () => {

        try {
            const data = await fetch(`${activeHost}/personList/chosenPerson/${personID}`);
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
    },[personID])



    useEffect(() => {
            fetchData()
                .catch(console.error);
        }, [fetchData]
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