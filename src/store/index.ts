import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { getRootReducer } from './RootReducer';
import rootSagas from './RootSagas';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

export default function configureStore() {
    const middlewareEnhancer = applyMiddleware(sagaMiddleware);

    const composedEnhancers = compose(middlewareEnhancer);
    const persistedReducer = persistReducer(persistConfig, getRootReducer());

    const store = createStore(persistedReducer, undefined, composedEnhancers);
    let persistor = persistStore(store);
    sagaMiddleware.run(rootSagas);
    return { store, persistor };
}
