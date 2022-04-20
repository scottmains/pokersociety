import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Scott Mains' },
    { id: '1', name: 'Head of Society' },
    { id: '2', name: 'Test User' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer