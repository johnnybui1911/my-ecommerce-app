import React, {memo} from 'react';
import {View} from 'react-native';
import OptimizedImage from '../../../components/OptimizedImage';
import styles from '../styles';

function MainListItem({item}) {
  return (
    <View style={styles.verticalListItem}>
      <OptimizedImage
        source={{uri: item?.urls?.thumb}}
        style={styles.verticalListImage}
        resizeMode="cover"
      />
    </View>
  );
}
export default memo(MainListItem);
