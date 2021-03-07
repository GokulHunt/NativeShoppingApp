import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import FontSizes from '../../constants/FontSizes';

const INPUT_CHANGE ='INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  if ( action.type === INPUT_CHANGE ) {
    return {
      ...state,
      value: action.value,
      isValid: action.isValid
    }
  }
  if ( action.type === INPUT_BLUR )
  {
    return {
      ...state,
      touched: true
    }
  }
  return state;
}

const Input = props => {

  const [inputState, inputDispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValidity,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched ) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [onInputChange, inputState, id]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    inputDispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  }

  const inputLostFocusHandler = () => {
    inputDispatch({ type: INPUT_BLUR });
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} value={inputState.value} onChangeText={textChangeHandler} onBlur={inputLostFocusHandler} />
        {!inputState.isValid && inputState.touched &&
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 20
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 5
  },
  input: {
    padding: 2,
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1
  },
  errorContainer: {
    marginVertical: 10
  },
  errorText: {
    fontFamily: 'open-sans-bold',
    color: Colors.redColor,
    fontSize: FontSizes.body
  }
});

export default Input;
