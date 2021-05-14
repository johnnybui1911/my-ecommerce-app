import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../../constants/colors';
import {sizes, STATUS_BAR_HEIGHT} from '../../constants/sizes';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header({inputProps}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.headerAnimationContainer,
        {
          paddingTop: Math.max(insets.top, 16),
        },
      ]}>
      <View style={[styles.headerContainer]}>
        <View style={{paddingHorizontal: 16}}>
          <Icon name="search" size={24} color={colors.gray} />
        </View>
        <TextInput
          style={styles.headerInput}
          placeholder="Skip Hop: 20% OFF"
          placeholderTextColor={colors.shopee_orange}
          {...inputProps}
        />
        <View style={{paddingHorizontal: 16}}>
          <Icon name="camera" size={24} color={colors.gray} />
        </View>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Icon
          name="shopping-cart"
          size={30}
          style={{
            color: colors.shopee_orange,
          }}
        />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <Icon
          name="comments"
          size={30}
          style={{
            color: colors.shopee_orange,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerAnimationContainer: {
    backgroundColor: colors.white,
    paddingLeft: sizes.medium,
    flexDirection: 'row',
    height: 40 + STATUS_BAR_HEIGHT + 16 * 2,
    alignItems: 'center',
  },
  headerInput: {flex: 1, height: 40},
  headerContainer: {
    flex: 1,
    backgroundColor: colors.background_gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
