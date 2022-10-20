import { PersonUpdatedList, PositionList } from "../../../../../backend/types/personPosition";

export interface AddPersonType extends Omit<PersonUpdatedList, 'position'|'personId' | 'salary'>{
    position: PositionList | '';
    salary: number | '';
}