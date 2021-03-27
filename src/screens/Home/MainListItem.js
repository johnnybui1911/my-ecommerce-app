import React, {memo, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import images from '../../assets/images';
import colors from '../../constants/colors';

function MainListItem({item, index}) {
  // useEffect(() => {
  //   // console.log(`Product ${index} is rendered`);
  //   // return () => {
  //   //   console.log(`Product ${index} is unmounted`);
  //   // };
  // }, [item, index]);

  return (
    <View
      style={{
        margin: 4,
        backgroundColor: colors.white,
      }}
      //   onLayout={(event) => {
      //     console.log(event.nativeEvent);
      //   }}
    >
      <Image
        source={{uri: item?.urls?.thumb ?? images.product1}}
        style={{width: 190, height: 190}}
      />
      <View style={{padding: 8}}>
        <Text>Product {index}</Text>
      </View>
    </View>
  );
}
export default memo(MainListItem);
