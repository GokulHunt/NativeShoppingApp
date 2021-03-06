import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';

import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);

  return (
    <View style={styles.screen}>
      <FlatList data={orders} keyExtractor={(item, index) => item.id} renderItem={itemData => <OrderItem amount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items}/>}/>
    </View>
  );
}

OrdersScreen.navigationOptions = navdata => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navdata.navigation.toggleDrawer() }/>
     </HeaderButtons>
   }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default OrdersScreen;
