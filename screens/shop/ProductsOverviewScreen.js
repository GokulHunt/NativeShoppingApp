import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderIcon from '../../components/UI/CustomHeaderButton';


import * as cartAction from '../../store/actions/cartAction';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <FlatList data={products} keyExtractor={(item, index) => item.id}
        renderItem={itemData => {
          return <ProductItem title={itemData.item.title} image={itemData.item.imageUrl}
              price={itemData.item.price} onViewDetails={() => {
                props.navigation.navigate({
                  routeName: 'ProductDetails',
                  params: {
                    id: itemData.item.id,
                    title: itemData.item.title
                  }
                })
              }}
              onAddToCart={() => {
                dispatch(cartAction.addToCart(itemData.item));
              }}/>
      }}/>
    </View>
  );
}

ProductsOverviewScreen.navigationOptions = navdata => {
  return {
    headerTitle: 'All Products',
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderIcon}>
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
  }
});

export default ProductsOverviewScreen;
