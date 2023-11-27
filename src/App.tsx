import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configStore from './store';
import RootRoutes from './routes/RootRoutes';
import moment from 'moment-timezone';

const { store, persistor } = configStore();

function App() {
    moment.tz.setDefault('America/New_York');

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RootRoutes />
            </PersistGate>
        </Provider>
    );
}

export default App;
