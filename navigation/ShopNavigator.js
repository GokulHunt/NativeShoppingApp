import React from 'react';
import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import Colors from '../constants/Colors';

const defaultStackNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? Colors.whiteColor : Colors.primaryColor
};

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen,
  ProductDetails: ProductDetailsScreen,
  Cart: CartScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart' } size={23} color={drawerConfig.tintColor}/>
  },
  defaultNavigationOptions: defaultStackNavigationOptions
});

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={ Platform.OS === 'android' ? 'md-list' : 'ios-list' } size={23} color={drawerConfig.tintColor}/>
  },
  defaultNavigationOptions: defaultStackNavigationOptions
});

const MyProductsNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProduct: EditProductScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={ Platform.OS === 'android' ? 'md-create' : 'ios-create' } size={23} color={drawerConfig.tintColor}/>
  },
  defaultNavigationOptions: defaultStackNavigationOptions
});

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  MyProducts: MyProductsNavigator
}, {
  contentOptions: {
      activeTintColor: Colors.primaryColor
  }
});

export default createAppContainer(ShopNavigator);
