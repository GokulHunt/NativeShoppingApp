import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as productsAction from '../../store/actions/productsAction';

const EditProductScreen = props => {
  const productId = props.navigation.getParam('productId');
  const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
  const dispatch = useDispatch();

  const [title, setTitle] = useState(product ? product.title : '');
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(product ? product.description : '');

  const submitHandler = useCallback(() => {
    if (product) {
      dispatch(productsAction.updateProduct(productId, title, description, imageUrl));
    }
    else {
      dispatch(productsAction.createProduct(title, description, imageUrl, +price));
    }
    props.navigation.goBack();
  }, [product, productId, title, description, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({
      'submit': submitHandler
    });
  }, [submitHandler]);

  return (
    <View>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)} />
          </View>

          {product ?
            null :
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price</Text>
              <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)} />
            </View>
          }

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

EditProductScreen.navigationOptions = navdata => {
  return {
    headerTitle: navdata.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Save' iconName={ Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={() => {
          navdata.navigation.getParam('submit')();
        }}/>
     </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  form: {
    margin: 20
  },
  inputContainer: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 5
  },
  input: {
    padding: 2,
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
