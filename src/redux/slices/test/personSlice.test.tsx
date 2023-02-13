import { PersonPositionDataInterface } from "../../../../../backend/types/personPositionData";
import { UsersState} from "../../store/storeType";
import { getPeopleList, personSlice} from "../personSlice";



const mockData: { personPositionData: PersonPositionDataInterface[] } | { personPositionData: [] } = {
    personPositionData: [{personId: '1', name: 'John',surName:'Doe',salary:2222,position:'Assistant'}]
};

const initialState: UsersState = {
    receivedData: {personPositionData: []},
    status: null
};

describe('personSlice', () => {
    describe('reducers', () => {
        it('removePersonFromState should remove a person from receivedData', () => {
            const newState = personSlice.reducer(initialState, {
                type: personSlice.actions.removePersonFromState.type,
                payload: { id: '1' }
            });
            expect(newState).toEqual({
                receivedData: {personPositionData: []},
                status: null
            });
        });
    });

    describe('extraReducers', () => {
        it('getPeopleList.pending should update state with status "pending"', () => {
            const newState = personSlice.reducer(initialState, {
                type: getPeopleList.pending.type
            });
            expect(newState).toEqual({
                receivedData: {personPositionData: []},
                status: 'pending'
            });
        });

        it('getPeopleList.fulfilled should update state with status "succeeded" and receivedData', () => {
            const newState = personSlice.reducer(initialState, {
                type: getPeopleList.fulfilled.type,
                payload: mockData
            });
            expect(newState).toEqual({
                receivedData: mockData,
                status: 'succeeded'
            });
        });

        it('getPeopleList.rejected should update state with status "failed"', () => {
            const newState = personSlice.reducer(initialState, {
                type: getPeopleList.rejected.type
            });
            expect(newState).toEqual({
                receivedData: {personPositionData: []},
                status: 'failed'
            });
        });
    });
});
