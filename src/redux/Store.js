import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import peopleReducer from './PeopleSlice';
import contactReducer from './ContactSlice';

export const store = configureStore({
    reducer: {
        people: peopleReducer,
        contacts: contactReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});
