import * as yup from "yup";


const regexpString = /^[a-zA-ZäöüßÄÖÜąĄćĆżŻŁłźŹŚś]+$/;

export const validationSchema = yup.object({
    name: yup
        .string()
        .min(3, 'Name should include at least 3 signs!')
        .max(50, 'Name length is maximum 50')
        .matches(regexpString,'Please use only letters')
        .required('name is required'),
    surname: yup
        .string()
        .min(3, 'surname should include at least 3 signs!')
        .max(50, 'surname length is maximum 50')
        .matches(regexpString,'Please use only letters')
        .required('surname is required'),
    salary: yup
        .number()
        .min(1, 'salary should be at least 1')
        .max(1000000, 'maximum salary is 1000000')
        .required('salary is required'),
    position: yup
        .string()
        .required('please choose the position!'),
});