import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import images from '../../assets/images';
import {SCREEN_WIDTH} from '../../constants/sizes';

function Carousel() {
  console.log('Carousel is rendered');
  return (
    <View style={{}}>
      <Image
        source={images.carousel1}
        style={{height: 220, width: SCREEN_WIDTH}}
      />
    </View>
  );
}

export default memo(Carousel);
