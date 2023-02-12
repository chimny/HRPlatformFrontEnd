import { UsersState } from "../../store/storeType";
import { getPeopleList, personSlice} from "../personSlice";

//@todo write tests according to proper fetch data

const mockData = {
    personPositionData: [{personId: '1', name: 'John'}]
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
