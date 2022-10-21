import { NewPersonPosition } from "../../../../backend/types/newPesonPosition";

import {FormInterface} from "../../components/Form/SingleInput";


export interface  UsersState {
        receivedData: { personPositionData: NewPersonPosition[] } | { personPositionData: [] },
        status: null | 'pending' | 'succeeded' | 'failed'
}

export interface UpdateFormStoreInterface {
    receivedData: { chosenPersonData: NewPersonPosition } | { chosenPersonData: null },
    formData: FormInterface[],
    status: null | 'pending' | 'succeeded' | 'failed'
}


export interface PersonStoreInterface {
    personList: UsersState,
    addPersonForm: FormInterface[],
}