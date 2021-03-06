import React from 'react';
import { View, Button, FlatList, StyleSheet, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import *  as productsAction from '../../store/actions/productsAction';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = productId => {
    props.navigation.navigate('EditProduct', { productId: productId });
  }

  const deleteProductHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this product?', [
      { text: 'No', style: 'default' },
      { text: 'Yes', style: 'destructive', onPress: () => {
        dispatch(productsAction.deleteProduct(id));
      }}
    ]);
  }

  return (
    <View>
      <FlatList data={userProducts} keyExtractor={(item, index) => item.id} renderItem={itemData => {
        return (
          <ProductItem image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} onSelect={() => editProductHandler(itemData.item.id)}>
            <View style={styles.buttonContainer}>
              <Button color={Colors.primaryColor} title='Edit' onPress={() => editProductHandler(itemData.item.id)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button color={Colors.primaryColor} title='Delete' onPress={() => deleteProductHandler(itemData.item.id)} />
            </View>
          </ProductItem>
        );
      }}/>
    </View>
  );
}

UserProductsScreen.navigationOptions = navdata => {
  return {
    headerTitle: 'Your Products',
    headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => navdata.navigation.toggleDrawer() }/>
     </HeaderButtons>,
   headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
       <Item title='Add' iconName={ Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => navdata.navigation.navigate('EditProduct') }/>
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

export default UserProductsScreen;
