import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// import { configureStore, createSlice } from "@reduxjs/toolkit";

// export const userReducer = createSlice({
//   name: "User",
//   initialState: {
//     user: null,
//     isFetching: false,
//     error: false,
//   },
//   reducers: {
//     loginStart(state) {
//       state.isFetching = true;
//     },
//     loginSuccess(state, action) {
//       console.log("action.payload");
//       console.log(action.payload);
//       state.isFetching = false;
//       state.user = action.payload;
//     },
//     loginFailure(state) {
//       state.isFetching = false;
//       state.error = true;
//     },
//     logout(state) {
//       state.user = null;
//     },
//   },
// });

// export const actions = userReducer.actions;
// const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
// export default store;
// export default userReducer.reducer;
