import { useParams } from "react-router";


export const PersonFilledGetForm =()=>{

    let { personID } = useParams();



    return(
        <h1>here's your person ID which soon be validated and implemented in the form {personID}</h1>
    )

}