import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user_reducer";
import biometricReducer from "./biometric_reducer";

const rootReducer = combineReducers({
    user: userReducer,
    biometric: biometricReducer,
})

export default rootReducer