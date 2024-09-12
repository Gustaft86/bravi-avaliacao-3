import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, createContact, updateContact, deleteContact } from '../api/ContactsApi';

export const fetchContactsByPersonIdThunk = createAsyncThunk(
    'contacts/fetchContactsByPersonId',
    async (personId, thunkAPI) => {
        try {
            const response = await fetchContacts(personId);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const createContactThunk = createAsyncThunk(
    'contacts/createContact',
    async ({ personId, contact }, thunkAPI) => {
        try {
            const response = await createContact(personId, contact);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const updateContactThunk = createAsyncThunk(
    'contacts/updateContact',
    async (contact, thunkAPI) => {
        try {
            const response = await updateContact(contact._id, contact);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

export const deleteContactThunk = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            await deleteContact(contactId);
            return contactId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.toString());
        }
    }
);

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactsByPersonIdThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchContactsByPersonIdThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchContactsByPersonIdThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createContactThunk.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateContactThunk.fulfilled, (state, action) => {
                const index = state.list.findIndex(contact => contact._id === action.payload._id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteContactThunk.fulfilled, (state, action) => {
                state.list = state.list.filter(contact => contact._id !== action.payload);
            });
    },
});

export default contactSlice.reducer;
