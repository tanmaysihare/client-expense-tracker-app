import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from "./AuthSlice";
import PremiumMemberReducer from './PremiumMember';

const ReduxStore = configureStore({
    reducer:{ Auth:AuthReducer , premium_membership:PremiumMemberReducer},
});

export default ReduxStore;