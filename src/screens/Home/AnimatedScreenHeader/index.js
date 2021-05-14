import React, {memo} from 'react';
import {View, TextInput} from 'react-native';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../../constants/colors';
import styles from '../styles';

const {interpolate, interpolateColors} = Animated;
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function AnimatedScreenHeader({scrollY}) {
  const insets = useSafeAreaInsets();
  console.log('AnimatedHeader re render');
  const headerOpacityAnimate = interpolate(scrollY, {
    inputRange: [-20, 0],
    outputRange: [0, 1],
  });

  const headerBgColorAnimate = interpolateColors(scrollY, {
    inputRange: [0, 200 / 2],
    outputColorRange: [colors.header_transparent, colors.white],
  });

  const headerIconColorAnimate = interpolateColors(scrollY, {
    inputRange: [0, 200 / 2],
    outputColorRange: [colors.white, colors.shopee_orange],
  });

  const headerInputBgColorAnimate = interpolateColors(scrollY, {
    inputRange: [0, 200 / 2],
    outputColorRange: [colors.white, colors.background_gray],
  });
  return (
    <Animated.View
      style={[
        styles.headerAnimationContainer,
        {
          backgroundColor: headerBgColorAnimate,
          opacity: headerOpacityAnimate,
        },
        {
          paddingTop: Math.max(insets.top, 16),
        },
      ]}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            backgroundColor: headerInputBgColorAnimate,
          },
        ]}>
        <View style={{paddingHorizontal: 16}}>
          <Icon name="search" size={24} color={colors.gray} />
        </View>
        <TextInput
          style={styles.headerInput}
          placeholder="Skip Hop: 20% OFF"
          placeholderTextColor={colors.shopee_orange}
        />
        <View style={{paddingHorizontal: 16}}>
          <Icon name="camera" size={24} color={colors.gray} />
        </View>
      </Animated.View>
      <View style={{paddingHorizontal: 16}}>
        <AnimatedIcon
          name="shopping-cart"
          size={30}
          style={{
            color: headerIconColorAnimate,
          }}
        />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <AnimatedIcon
          name="comments"
          size={30}
          style={{
            color: headerIconColorAnimate,
          }}
        />
      </View>
    </Animated.View>
  );
}

export default memo(AnimatedScreenHeader);
