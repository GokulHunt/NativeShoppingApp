import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ShopNavigator from './navigation/ShopNavigator';

import productsReducer from './store/reducers/productsReducer';

export default function App() {

  const rootReducer = combineReducers({
    products: productsReducer
  });

  const store = createStore(rootReducer);

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
