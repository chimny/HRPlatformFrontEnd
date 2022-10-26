import {Field,ErrorMessage} from "formik";
import {TextError} from "../TextError";
import {FormikInterface} from "../FormikControl";


interface Select extends FormikInterface {
    options?: any
}

export const Select = (props:Select)=>{
    const {label, name, options, ...rest} = props;


    return(
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name} {...rest}>
                {
                options.map((option : any) =>{
                    return <option key={option.value} value={option.value}>{option.key}</option>
                })
                }
                </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    )
}