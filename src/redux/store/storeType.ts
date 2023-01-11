import {PersonPositionDataInterface} from '../../../../backend/types/personPositionData';


export interface  UsersState {
        receivedData: { personPositionData: PersonPositionDataInterface[] } | { personPositionData: [] },
        status: null | 'pending' | 'succeeded' | 'failed'
}


export interface PersonStoreInterface {
    personList: UsersState,
}