import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';
import * as cartAction from '../../store/actions/cartAction';

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
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amountText}>${totalAmount.toFixed(2)}</Text>
        </Text>
        <Button title='Order Now' color={Colors.accentColor} disabled={cartItems.length === 0}/>
      </View>
      <View>
        <FlatList data={cartItems} keyExtractor={(item, index) => item.productId} renderItem={itemData => {
          return <CartItem quantity={itemData.item.quantity} title={itemData.item.productTitle}
                amount={itemData.item.sum} onRemove={() => {
                  dispatch(cartAction.removeFromCart(itemData.item.productId));
                }}/>
        }} />
      </View>

    </View>
  );
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
    shadowColor: Colors.grayColor,
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 1 },
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
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
