import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const OrderItem = props => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={showDetail ? 'Hide Details' : 'Show Details'} color={Colors.primaryColor} onPress={() => setShowDetail(prevState => !prevState)}/>
      </View>
      {showDetail && <View style={styles.details}>
        {props.items.map(item => <CartItem key={item.productId} quantity={item.quantity} amount={item.sum} title={item.productTitle}/>)}
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: Colors.grayColor,
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 1 },
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    overflow: 'hidden',
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: FontSizes.cartItem
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: FontSizes.cartItem,
    color: Colors.darkGrayColor
  },
  buttonContainer: {
    width: 150
  },
  details: {
    width: '100%'
  }
});

export default OrderItem;
