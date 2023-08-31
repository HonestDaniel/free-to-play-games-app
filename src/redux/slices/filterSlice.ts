import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sortBy: 'relevance',
    categorizeBy: 'mmorpg',
    platform: 'all'
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        },
        setCategorizeBy: (state, action) => {
            state.categorizeBy = action.payload
        },
        setPlatform: (state, action) => {
            console.log(action.payload)
            state.platform = action.payload
        }
    }
})

export const { setSortBy, setCategorizeBy, setPlatform } = filterSlice.actions;

export default filterSlice.reducer;