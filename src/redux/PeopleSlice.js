import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPeople, createPerson, deletePerson } from '../api/PeopleApi';

export const fetchPeopleThunk = createAsyncThunk(
    'people/fetchPeople',
    async (_, thunkAPI) => {
        try {
            const response = await fetchPeople();
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const createPersonThunk = createAsyncThunk(
    'people/createPerson',
    async (newPersons, thunkAPI) => {
        try {
            const response = await createPerson(newPersons);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const deletePersonThunk = createAsyncThunk(
    'people/deletePerson',
    async (id, thunkAPI) => {
        try {
            await deletePerson(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPeopleThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPeopleThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchPeopleThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createPersonThunk.fulfilled, (state, action) => {
                state.list.push(...action.payload); // Adiciona as pessoas criadas à lista
            })
            .addCase(createPersonThunk.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deletePersonThunk.fulfilled, (state, action) => {
                state.list = state.list.filter(person => person._id !== action.payload); // Remove a pessoa da lista
            })
            .addCase(deletePersonThunk.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default peopleSlice.reducer;
