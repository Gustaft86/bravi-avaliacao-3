// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import peopleReducer from './peopleSlice'; // Importar o slice de pessoas

export const store = configureStore({
    reducer: {
        people: peopleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});
