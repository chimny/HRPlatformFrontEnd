import { NewPersonPosition } from "../../../../backend/types/newPesonPosition";

import {FormInterface} from "../../components/AddPerson/SingleInput";


export interface  UsersState {
        receivedData: { personPositionData: NewPersonPosition[] } | { personPositionData: [] },
        status: null | 'pending' | 'succeeded' | 'failed'
}


export interface StoreInterface {
    personList: UsersState,
    addPersonForm: FormInterface[]
}