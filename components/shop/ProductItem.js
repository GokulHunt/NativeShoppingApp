import React from 'react';
import { View, Text, Image, Button, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform } from 'react-native';

import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const ProductItem = props => {
  let TouchableComponent = TouchableOpacity;

  if ( Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback
  }

  return (

  <View style={styles.product}>
    <TouchableComponent onPress={props.onSelect} useForeground={true}>
      <View style={styles.touchable}>
        <Image style={styles.image} source={{ uri: props.image }}/>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {props.children}
        </View>
      </View>
    </TouchableComponent>
  </View>
  );

}

const styles = StyleSheet.create({
  product: {
    shadowColor: Colors.grayColor,
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 1 },
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.whiteColor,
    borderRadius: 20,
    height: 300,
    margin: 10,
    overflow: 'hidden'
  },
  touchable: {
    flex: 1
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 10
  },
  image: {
    width: '100%',
    height: '60%'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: FontSizes.productTitle,
    marginVertical: 5
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: FontSizes.price,
    color: Colors.darkGrayColor
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20
  },
  button: {

  }
});

export default ProductItem;
