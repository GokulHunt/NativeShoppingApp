import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemContainer}>
        <Text style={styles.quantityText}>{props.quantity} X </Text>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.amountText}>{props.amount.toFixed(2)}</Text>
        {props.fromCart && <TouchableOpacity style={styles.deleteButton} onPress={props.onRemove}>
          <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color='red' />
        </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: Colors.whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%'
  },
  quantityText: {
    fontFamily: 'open-sans',
    color: Colors.darkGrayColor,
    fontSize: FontSizes.cartItem
  },
  titleText: {
    fontFamily: 'open-sans-bold',
    fontSize: FontSizes.cartItem
  },
  amountText: {
    fontFamily: 'open-sans-bold',
    fontSize: FontSizes.cartItem
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default CartItem;
