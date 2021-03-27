import React, {memo} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import colors from '../../constants/colors';

function ListFooter() {
  console.log('ListFooter is rendered');
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={colors.shopee_orange} />
      {/* <Text style={{color: colors.shopee_orange}}>Loading...</Text> */}
    </View>
  );
}

export default memo(ListFooter);
