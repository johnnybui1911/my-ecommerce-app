import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import images from '../../../assets/images';
import styles from '../styles';

function MainListItem({item, index}) {
  return (
    <View style={styles.verticalListItem}>
      <Image
        source={{uri: item?.urls?.thumb ?? images.product1}}
        style={styles.verticalListImage}
      />
      <View style={styles.verticalListContent}>
        <Text>Product {index}</Text>
      </View>
    </View>
  );
}
export default memo(MainListItem);
