import { NewPersonPosition } from "../../../../backend/types/newPesonPosition";

import {FormInterface} from "../../components/Form/SingleInput";


export interface  UsersState {
        receivedData: { personPositionData: NewPersonPosition[] } | { personPositionData: [] },
        status: null | 'pending' | 'succeeded' | 'failed'
}

export interface  formUpdateState {
    receivedData: { chosenPersonData: NewPersonPosition } | { chosenPersonData: null },
    formInitialData: any,
    status: null | 'pending' | 'succeeded' | 'failed'
}


export interface StoreInterface {
    personList: UsersState,
    addPersonForm: FormInterface[],
}