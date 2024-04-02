import { createSlice } from "@reduxjs/toolkit";

const premiumMembership = createSlice({
    name: "premium_membership",
    initialState:{
        isPremium: false,
    },
    reducers: {
        buyPremium: (state,action) => {
            state.isPremium = action.payload;
        }
    }
})

export const { buyPremium } = premiumMembership.actions;

export default premiumMembership.reducer;