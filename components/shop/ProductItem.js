import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const ProductItem = props => {
  return (
    <View style={styles.product}>
      <Image style={styles.image} source={{ uri: props.image }}/>
      <View style={styles.details}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button color={Colors.primaryColor} title='View Details' onPress={props.onViewDetails} />
        <Button color={Colors.accentColor} title='Add To Cart' onPress={props.onAddToCart} />
      </View>
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
    fontSize: FontSizes.productTitle,
    marginVertical: 5
  },
  price: {
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
