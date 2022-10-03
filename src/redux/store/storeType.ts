import {PersonEntity} from "../../../../backend/types/person";
import {FormInterface} from "../../components/AddPerson/SingleInput";


export interface  UsersState {
        receivedData: { peopleList: PersonEntity[] } | { peopleList: [] },
        status: null | 'pending' | 'succeeded' | 'failed'
}


export interface StoreInterface {
    personList: UsersState,
    addPersonForm: FormInterface[]
}