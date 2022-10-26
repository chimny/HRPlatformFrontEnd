import * as Yup from 'yup';
import {Formik, Form} from "formik";
import {FormikControl} from "./FormikControl";
import {positionList} from "../../data/positionList";


export const FormikContainer = () => {

    const dropdownOption = [{
        key: 'select an option',
        value: ''
    },
        {
            key: 'manager',
            value: 'manager'
        },
        {
            key: 'trainee',
            value: 'trainee'
        }]

    const initialValues = {
        name: '',
        surname: '',
        selectOption: ''
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('required'),
        surname: Yup.string().required('required'),
        selectOption: Yup.string().required('required')
    });
    const onSubmit = (values: any) => console.log(`form data `, values)

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                formik => <Form>
                    <FormikControl control='input' type="text" label="name" name="name"/>
                    <FormikControl control='input' type="text" label="surname" name="surname"/>
                    <FormikControl control='select' type="select" label="choose the position" name="position" option={dropdownOption}/>
                    <button type='submit'>Submit</button>
                </Form>
            }
        </Formik>
    );
};
