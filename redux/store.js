import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dogsApi } from './dogs/dogsReducer';
import { authReducer } from './auth/authSlice';
import { statusReducer } from "./status/statusSlice";
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
// auth: persistReducer(persistConfig, authReducer),
const store = configureStore({
    reducer: {    
      status:statusReducer,    
       auth: persistReducer(persistConfig, authReducer),
        [dogsApi.reducerPath]: dogsApi.reducer,
              },
              middleware: (getDefaultMiddleware) => [
                ...getDefaultMiddleware({
                  serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                  },
                }),
                dogsApi.middleware,
              ],
},
applyMiddleware(thunk));

const persistor = persistStore(store);

export default { store, persistor };