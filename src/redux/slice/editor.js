import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editorText: null,
  updateNote:null,
  selectedNoteToDelete: null
};

export const textEditor = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    noteTextDetails: (state, action) => {
      state.editorText = action.payload;
    },
    noteUpdate: (state, action) => {
      state.updateNote = action.payload;
    },
    selectedNoteDelete: (state, action) => {
      state.selectedNoteToDelete = action.payload;
    },
  },
});

export const {
  noteTextDetails,
  noteUpdate,
  selectedNoteDelete
} =
textEditor.actions;
export default textEditor.reducer;
