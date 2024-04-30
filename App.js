import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { AppNavigator } from './screens/AppNavigator';
import store from './redux/store';

const App = () => {
  const [fontsLoaded] = useFonts({
    Jersey: require('./assets/fonts/Jersey15-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
