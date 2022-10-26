import { Input } from "./fieldType/Input";
import { Select } from "./fieldType/Select";

export interface FormikInterface {
    control ?:  'input' | 'select';
    options ?: object
    label : string;
    name : string;
    type : string;

}


export const FormikControl = (props : FormikInterface) => {
    const {control, ...rest } = props;



    switch (control) {

        case 'input':
            return <Input {...rest} />
        case 'select':
            return <Select {...rest} />
        default:
            return null
    }


}