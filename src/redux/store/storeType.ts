import {PersonEntity} from "../../../../backend/types/person";


export interface  UsersState {
        receivedData: { peopleList: PersonEntity[] } | { peopleList: [] },
        status: null | 'pending' | 'succeeded' | 'failed'
}


export interface StoreInterface {
    personList: UsersState
}