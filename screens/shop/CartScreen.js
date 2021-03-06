import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';
import Card from '../../components/UI/Card';
import * as cartAction from '../../store/actions/cartAction';
import * as ordersAction from '../../store/actions/ordersAction';

const CartScreen = props => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) => a.productId < b.productId ? 1 : -1);
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amountText}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button title='Order Now' color={Colors.accentColor} disabled={cartItems.length === 0} onPress={() => {
          dispatch(ordersAction.addOrder(cartItems, totalAmount));
        }}/>
      </Card>
      <View>
        <FlatList data={cartItems} keyExtractor={(item, index) => item.productId} renderItem={itemData => {
          return <CartItem quantity={itemData.item.quantity} title={itemData.item.productTitle}
                amount={itemData.item.sum} onRemove={() => {
                  dispatch(cartAction.removeFromCart(itemData.item.productId));
                }} fromCart />
        }} />
      </View>

    </View>
  );
}

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: FontSizes.cartSummary
  },
  amountText: {
    color: Colors.primaryColor
  }
});

export default CartScreen;
