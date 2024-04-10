import { configureStore } from "@reduxjs/toolkit";
import motorbikeReducers from "../reducers/motorbikeReducers";
export default configureStore({
   reducer: {
       listBike: motorbikeReducers
   }
});