import React, {memo} from 'react';
import {View, ActivityIndicator} from 'react-native';
import colors from '../../../constants/colors';
import styles from '../styles';

function ListFooter() {
  console.log('ListFooter is rendered');
  return (
    <View style={styles.listFooter}>
      <ActivityIndicator color={colors.shopee_orange} />
      {/* <Text style={{color: colors.shopee_orange}}>Loading...</Text> */}
    </View>
  );
}

export default memo(ListFooter);
