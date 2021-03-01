import React from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';
import * as cartAction from '../../store/actions/cartAction';

const ProductDetailsScreen = props => {
  const productId = props.navigation.getParam('id');
  const dispatch = useDispatch();



  const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
  return (
    <View style={styles.screen}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }}/>
        <View style={styles.buttonContainer}>
          <Button title='Add To Cart' color={Colors.primaryColor} onPress={() => {
            dispatch(cartAction.addToCart(selectedProduct));
          }}/>
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </ScrollView>
    </View>
  );
}

ProductDetailsScreen.navigationOptions = navdata => {
  const productTitle = navdata.navigation.getParam('title');

  return {
    headerTitle: productTitle
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  image: {
    width: '100%',
    height: 300
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    color: Colors.darkGrayColor,
    fontSize: FontSizes.price,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'open-sans-bold'
  },
  description:{
    fontSize: FontSizes.body,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans'
  }

});

export default ProductDetailsScreen;
