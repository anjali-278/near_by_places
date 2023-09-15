import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";


import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            immutableCheck: { warnAfter: 128 },
            serializableCheck: {
            warnAfter: 128 ,
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }, thunk: false 
        }).prepend(sagaMiddleware)
    }
})

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;