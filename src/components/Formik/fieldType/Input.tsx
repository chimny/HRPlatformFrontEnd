import {FormikInterface} from "../FormikControl";
import {Field, ErrorMessage} from 'formik'
import {TextError} from "../TextError";

export const Input = (props: FormikInterface)=>{
const {label, name, ...rest} = props
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name} {...rest}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}