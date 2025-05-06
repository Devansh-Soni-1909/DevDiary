import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      // Check for duplicate title (case-insensitive optional)
      const titleExists = state.pastes.some(
        (p) => p.title.trim().toLowerCase() === paste.title.trim().toLowerCase()
      );

      if (titleExists) {
        toast.error("A paste with this title already exists!");
        return;
      }
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Successfully");


    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(p => p._id === updatedPaste._id);
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste successfully Updated");
      }

    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const idToRemove = action.payload;
      state.pastes = state.pastes.filter(p => p._id !== idToRemove);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste deleted successfully");

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes ,removeFromPastes} = pasteSlice.actions

export default pasteSlice.reducer