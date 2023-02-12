// import React from 'react';
// import {render, fireEvent, waitFor} from '@testing-library/react';
// import './styles/FormikField.css'
// import { Formik } from '../Formik';
// import { FormikSelectProps } from '../FormikSelect';
//
//
//
// jest.mock('../FormikSelect', () => ({
//     FormikSelect: jest.fn(({ name, label, items, error }:FormikSelectProps) => (
//         <select id={name} data-testid={`${name}-select`}>
//             {items.map((item) => (
//                 <option key={item.value} value={item.value}>
//                     {item.label}
//                 </option>
//             ))}
//         </select>
//     )),
// }));
//
// jest.mock('../../Spinner/Spinner', () => ({
//     Spinner: jest.fn(() => <div data-testid="spinner" />),
// }));
//
// jest.mock('../../SnackbarComponent', () => ({
//     SnackbarComponent: jest.fn(({ open, handleClose, severityStatus }) => (
//         <div data-testid="snackbar">
//             {open && (
//                 <div data-testid="snackbar-message">{severityStatus.message}</div>
//             )}
//         </div>
//     )),
// }));
//
// describe('Formik', () => {
//     beforeEach(() => {
//         (fetch as jest.Mock).mockReset();
//     });
//
//     it('should render the form with all fields', async () => {
//         (fetch as jest.Mock).mockResolvedValueOnce({});
//
//         const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//         const nameField = getByLabelText('name');
//         const surnameField = getByLabelText('surname');
//         const salaryField = getByLabelText('salary');
//         const positionSelect = getByTestId('position-select');
//         const submitButton = getByText('Submit...');
//
//         expect(nameField).toBeInTheDocument();
//         expect(surnameField).toBeInTheDocument();
//         expect(salaryField).toBeInTheDocument();
//         expect(positionSelect).toBeInTheDocument();
//         expect(submitButton).toBeInTheDocument();
//     });
//
//     it('should show error messages when fields are left blank', async () => {
//         (fetch as jest.Mock).mockResolvedValueOnce({});
//         const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//         const nameField = getByLabelText('name');
//         const surnameField = getByLabelText('surname');
//         const salaryField = getByLabelText('salary');
//         const submitButton = getByText('Submit...');
//
//         fireEvent.click(submitButton);
//
//         await waitFor(() => {
//             const nameError = getByTestId('name-error');
//             const surnameError = getByTestId('surname-error');
//             const salaryError = getByTestId('salary-error');
//
//             expect(nameError).toBeInTheDocument();
//             expect(nameError.textContent).toBe('Name is required');
//             expect(surnameError).toBeInTheDocument();
//             expect(surnameError.textContent).toBe('Surname is required');
//             expect(salaryError).toBeInTheDocument();
//             expect(salaryError.textContent).toBe('Salary is required');
//         });
//     });
//
//     it('should show error message when salary is less than minimum value', async () => {
//         (fetch as jest.Mock).mockResolvedValueOnce({});
//
//         const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//         const nameField = getByLabelText('name');
//         const surnameField = getByLabelText('surname');
//         const salaryField = getByLabelText('salary');
//         const submitButton = getByText('Submit...');
//
//         fireEvent.change(nameField, { target: { value: 'John' } });
//         fireEvent.change(surnameField, { target: { value: 'Doe' } });
//         fireEvent.change(salaryField, { target: { value: '999' } });
//         fireEvent.click(submitButton);
//
//         await waitFor(() => {
//             const salaryError = getByTestId('salary-error');
//
//             expect(salaryError).toBeInTheDocument();
//             expect(salaryError.textContent).toBe('Salary must be at least 1000');
//         });
//     });
//
//     it('should show success message when form is submitted successfully', async () => {
//         (fetch as jest.Mock).mockResolvedValueOnce({
//             status: 200,
//             json: () => Promise.resolve({ success: true }),
//         });
//
//         const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//         const nameField = getByLabelText('name');
//         const surnameField = getByLabelText('surname');
//         const salaryField = getByLabelText('salary');
//         const submitButton = getByText('Submit...');
//
//         fireEvent.change(nameField, { target: { value: 'John' } });
//         fireEvent.change(surnameField, { target: { value: 'Doe' } });
//         fireEvent.change(salaryField, { target: { value: '1000' } });
//         fireEvent.click(submitButton);
//
//         await waitFor(() => {
//             const snackbarMessage = getByTestId('snackbar');
//             it('should show error message when salary is less than minimum value', async () => {
//                 (fetch as jest.Mock).mockResolvedValueOnce({});
//
//
//                 const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//                 const nameField = getByLabelText('name');
//                 const surnameField = getByLabelText('surname');
//                 const salaryField = getByLabelText('salary');
//                 const submitButton = getByText('Submit...');
//
//                 fireEvent.change(nameField, { target: { value: 'John' } });
//                 fireEvent.change(surnameField, { target: { value: 'Doe' } });
//                 fireEvent.change(salaryField, { target: { value: '0' } });
//
//                 fireEvent.click(submitButton);
//
//                 await waitFor(() => {
//                     const salaryError = getByTestId('salary-error');
//                     expect(salaryError).toBeInTheDocument();
//                     expect(salaryError.textContent).toBe(
//                         'Salary must be greater than or equal to 1000'
//                     );
//                 });
//             });
//
//             it('should show error message when salary is not a number', async () => {
//                 (fetch as jest.Mock).mockResolvedValueOnce({});
//
//                 const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//                 const nameField = getByLabelText('name');
//                 const surnameField = getByLabelText('surname');
//                 const salaryField = getByLabelText('salary');
//                 const submitButton = getByText('Submit...');
//
//                 fireEvent.change(nameField, { target: { value: 'John' } });
//                 fireEvent.change(surnameField, { target: { value: 'Doe' } });
//                 fireEvent.change(salaryField, { target: { value: 'not a number' } });
//
//                 fireEvent.click(submitButton);
//
//                 await waitFor(() => {
//                     const salaryError = getByTestId('salary-error');
//                     expect(salaryError).toBeInTheDocument();
//                     expect(salaryError.textContent).toBe('Salary must be a number');
//                 });
//
//
//             });
//
//             it('should show error message when salary is not a number', async () => {
//                 (fetch as jest.Mock).mockResolvedValueOnce({});
//
//                 const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//                 const nameField = getByLabelText('name');
//                 const surnameField = getByLabelText('surname');
//                 const salaryField = getByLabelText('salary');
//                 const submitButton = getByText('Submit...');
//
//                 fireEvent.change(nameField, { target: { value: 'John' } });
//                 fireEvent.change(surnameField, { target: { value: 'Doe' } });
//                 fireEvent.change(salaryField, { target: { value: 'not a number' } });
//
//                 fireEvent.click(submitButton);
//
//                 await waitFor(() => {
//                     const salaryError = getByTestId('salary-error');
//                     expect(salaryError).toBeInTheDocument();
//                     expect(salaryError.textContent).toBe('Salary must be a number');
//                 });
//             });
//
//             it('should show the spinner when form is submitted', async () => {
//                 (fetch as jest.Mock).mockResolvedValueOnce({});
//
//                 const { getByLabelText, getByText, getByTestId } = render(<Formik />);
//
//                 const nameField = getByLabelText('name');
//                 const surnameField = getByLabelText('surname');
//                 const salaryField = getByLabelText('salary');
//                 const submitButton = getByText('Submit...');
//
//                 fireEvent.change(nameField, { target: { value: 'John' } });
//                 fireEvent.change(surnameField, { target: { value: 'Doe' } });
//                 fireEvent.change(salaryField, { target: { value: '10000' } });
//
//                 fireEvent.click(submitButton);
//
//                 expect(getByTestId('spinner')).toBeInTheDocument();
//
//
//             });
//         })})
//
// })

export {}