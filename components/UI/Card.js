import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const Card = props => {
  return (
    <View style={{...styles.card, ...props.style}}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: Colors.grayColor,
    shadowOpacity: 0.26,
    shadowOffset: { height: 2, width: 1 },
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: Colors.whiteColor,
    borderRadius: 10
  }
});

export default Card;
