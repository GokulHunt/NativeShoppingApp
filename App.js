import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ShopNavigator from './navigation/ShopNavigator';

import productsReducer from './store/reducers/productsReducer';
import cartReducer from './store/reducers/cartReducer';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

// import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer);

const loadFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}


export default function App() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <AppLoading startAsync={loadFonts}
      onFinish={() => setLoaded(true)}
      onError={console.log('Error in loading the custom fonts')}/>
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <ShopNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
