//combine all the reducers:
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/auth"
import profileReducer from "../Slices/profile"
import cartReducer from "../Slices/cart"


const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer
})
export default rootReducer