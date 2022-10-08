import { setError,clearError } from "../../../redux/slices/formSlice";
import {AppDispatch} from "../../../redux/store/store";




export type response = {
    error: boolean,
    typeError: string | ''
}



export const validationFunction = (labels:string, value: string | number, dispatch:AppDispatch): response => {



    const safeValue = {
        error: false,
        typeError: ''
    }




    //@todo find better regexp in order include polish signs!
    const regName = /^[a-zA-Z ]+$/;

    switch (labels) {
        case 'name':




            if(!regName.test(String(value))){
                const errorMsg = 'please provide proper name!'
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }


            if (typeof value === "string" && value.length === 0) {
                const errorMsg = 'name can\'t be empty!'
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }

            if (typeof value === "string" && value.length > 50) {
                const errorMsg = 'max name length is 50!'
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }

            dispatch(clearError({label:labels}))
            return safeValue;


        case 'surname':

            if(!regName.test(String(value))){
                const errorMsg = 'please provide proper surname!'
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }


            if (typeof value === "string" && value.length === 0) {
                const errorMsg = 'surname can\'t be empty!';
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }

            if (typeof value === "string" && value.length > 50) {
                const errorMsg = 'max surname length is 50!'
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }

            dispatch(clearError({label:labels}))
            return safeValue;



        case 'position':
            if (typeof value === "string" && value.length === 0) {
                const errorMsg = 'please choose the position!';
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }

            dispatch(clearError({label:labels}))
            return safeValue;



        case 'salary':
            if (value === '') {
                const errorMsg = 'please provide salary value';
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: 'please provide salary value'
                }
            }

            if (isNaN(Number(value))) {
                const errorMsg = 'please provide number value!';
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }
            dispatch(clearError({label:labels}))
            return safeValue;



    }


    return safeValue

}