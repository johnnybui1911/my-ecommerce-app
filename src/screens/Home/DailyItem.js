import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import images from '../../assets/images';
import colors from '../../constants/colors';

function DailyItem({item, index}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginRight: 2,
        backgroundColor: colors.white,
      }}>
      <Image source={images.shirt} />
      <Text style={{marginTop: 16}}>{item.name}</Text>
    </View>
  );
}

export default memo(DailyItem);
