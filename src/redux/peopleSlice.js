import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setPeople: (state, action) => {
            state.list = action.payload;
        },
        addPerson: (state, action) => {
            state.list.push(action.payload);
        },
        removePerson: (state, action) => {
            state.list = state.list.filter(person => person._id !== action.payload);
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
});

export const { setPeople, addPerson, removePerson, setStatus, setError } = peopleSlice.actions;

export default peopleSlice.reducer;
