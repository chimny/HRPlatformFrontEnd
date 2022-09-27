import { PersonUpdatedList } from "../../../../../backend/types/personPosition";

export type AddPersonType = Omit<PersonUpdatedList,'personId'>;