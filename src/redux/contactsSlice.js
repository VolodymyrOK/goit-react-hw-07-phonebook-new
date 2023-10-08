import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, delContacts } from 'redux/operations';

const initState = {
  list: [],
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initState,
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContacts.pending](state) {
      state.isLoading = true;
    },
    [addContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.list.push(action.payload);
    },
    [addContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [delContacts.pending](state) {
      state.isLoading = true;
    },
    [delContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const idx = state.list.findIndex(
        contact => contact.id === action.payload.id
      );
      state.list.splice(idx, 1);
    },
    [delContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactsReducer = contactSlice.reducer;

export const selectContacts = state => state.contacts.list;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
