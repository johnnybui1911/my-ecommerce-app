import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import OptimizedImage from '../OptimizedImage';

function ProductView({item}) {
  return (
    <View style={styles.container}>
      <OptimizedImage
        source={{uri: item?.urls?.thumb}}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

export default memo(ProductView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    margin: 2,
  },
  image: {
    flex: 1,
  },
});
