import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);

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
              }} onAddToCart={() => {}}/>
      }}/>
    </View>
  );
}

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default ProductsOverviewScreen;
