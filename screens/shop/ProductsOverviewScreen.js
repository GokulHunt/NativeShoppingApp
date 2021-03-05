import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Platform } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';


import * as cartAction from '../../store/actions/cartAction';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: 'ProductDetails',
      params: {
        id: id,
        title: title
      }
    })
  }

  return (
    <View style={styles.screen}>
      <FlatList data={products} keyExtractor={(item, index) => item.id}
        renderItem={itemData => {
          return (
            <ProductItem title={itemData.item.title} image={itemData.item.imageUrl}
              price={itemData.item.price} onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}>
                <View style={styles.buttonContainer}>
                  <Button color={Colors.primaryColor} title='View Details' onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
                </View>
                <View style={styles.buttonContainer}>
                  <Button color={Colors.accentColor} title='Add To Cart' onPress={() => {
                    dispatch(cartAction.addToCart(itemData.item));
                  }} />
                </View>
            </ProductItem>
          );
      }}/>
    </View>
  );
}

ProductsOverviewScreen.navigationOptions = navdata => {
  return {
    headerTitle: 'All Products',
    headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {
          navdata.navigation.toggleDrawer();
        }}/>
     </HeaderButtons>,
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Cart' iconName={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {
        navdata.navigation.navigate({
          routeName: 'Cart'
        })
      }}/>
    </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  buttonContainer: {
    width: 120
  }
});

export default ProductsOverviewScreen;
