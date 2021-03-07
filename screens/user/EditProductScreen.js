import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import * as productsAction from '../../store/actions/productsAction';
import Input from '../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if ( action.type === FORM_INPUT_UPDATE ) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };

    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };

    let updatedFormValidity = true;
    for (let key in updatedValidities) {
      updatedFormValidity = updatedFormValidity && updatedValidities[key];
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormValidity
    }

  }

  return state;
}

const EditProductScreen = props => {
  const productId = props.navigation.getParam('productId');
  const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : '',
      imageUrl: product ? product.imageUrl : '',
      price: '',
      description: product ? product.description : ''
    },
    inputValidities: {
      title: product ? true : false,
      imageUrl: product ? true : false,
      price: product ? true : false,
      description: product ? true : false,

    },
    formIsValid: product ? true : false
  })

  // const [title, setTitle] = useState(product ? product.title : '');
  // const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
  // const [price, setPrice] = useState('');
  // const [description, setDescription] = useState(product ? product.description : '');
  //
  // const [isValidTitle, setIsValidTitle] = useState(false);

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Invalid input', 'Please check the form inputs', [
        { text: 'Okay' }]);
      return;
    }
    if (product) {
      dispatch(productsAction.updateProduct(productId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl));
    }
    else {
      dispatch(productsAction.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValuesimageUrl, +formState.inputValues.price));
    }
    props.navigation.goBack();
  }, [product, productId, formState]);

  useEffect(() => {
    props.navigation.setParams({
      'submit': submitHandler
    });
  }, [submitHandler]);


  const inputChangeHandler = useCallback((input, inputValue, inputValidity) => {
    formDispatch({ type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: input })
  }, [formDispatch]);

  return (
    <KeyboardAvoidingView style={styles.screen} behavior='padding' keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input id='title' label='Title' errorText='Enter a valid title' keyboardType='default'
              autoCapitalize='sentences' autoCorrect onInputChange={inputChangeHandler}
              initialValue={product ? product.title : ''} initialValidity={!!product} required/>

          <Input id='imageUrl' label='Image Url' errorText='Enter a valid image Url' keyboardType='default' onInputChange={inputChangeHandler}
              initialValue={product ? product.imageUrl : ''} initialValidity={!!product} required/>

          {product ?
            null :
            <Input id='price' label='Price' errorText='Enter a valid price' keyboardType='decimal-pad'
              onInputChange={inputChangeHandler} required min={0.1}/>
          }

          <Input id='description' label='Description' errorText='Enter a valid description' keyboardType='default'
              onInputChange={inputChangeHandler} autoCapitalize='sentences' autoCorrect numberOfLines={5} multiline
              initialValue={product ? product.description : ''} initialValidity={!!product} required minLength={5}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  }
});

export default EditProductScreen;
