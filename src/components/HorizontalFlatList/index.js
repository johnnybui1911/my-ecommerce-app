import React from 'react';
import {FlatList} from 'react-native';

export default function HorizontalFlatList(props) {
  return (
    <FlatList {...props} showsHorizontalScrollIndicator={false} horizontal />
  );
}
