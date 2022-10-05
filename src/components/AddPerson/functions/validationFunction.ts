import { setError } from "../../../redux/slices/formSlice";
import {AppDispatch} from "../../../redux/store/store";

export type availableLabels = 'name' | 'surName' | 'position' | 'salary'

export type response = {
    error: boolean,
    typeError: string | ''
}



export const validationFunction = (labels: any, value: string | number, dispatch:AppDispatch): response => {



    const safeValue = {
        error: false,
        typeError: ''
    }


    switch (labels) {
        case 'name':

            if (typeof value === "string" && value.length === 0) {
                const errorMsg = 'name can\'t be empty!'
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }

            return safeValue;


        case 'surname':

            if (typeof value === "string" && value.length === 0) {
                const errorMsg = 'surname can\'t be empty!';
                dispatch(setError({label:labels, errorMsg}))
                return {
                    error: true,
                    typeError: errorMsg
                }
            }
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
            return safeValue;



    }


    return safeValue

}