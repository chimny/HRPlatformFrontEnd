import { NewPersonPosition } from "../../../../backend/types/newPesonPosition";


export interface  UsersState {
        receivedData: { personPositionData: NewPersonPosition[] } | { personPositionData: [] },
        status: null | 'pending' | 'succeeded' | 'failed'
}


export interface PersonStoreInterface {
    personList: UsersState,
}