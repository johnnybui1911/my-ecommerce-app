import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {sizes, WINDOW_WIDTH} from '../../constants/sizes';

export default function PlaceholderList() {
  return (
    <View style={{backgroundColor: colors.background_gray}}>
      <View style={styles.veritcalListColumnWrapper}>
        <View style={[styles.verticalListItem]} />
        <View style={[styles.verticalListItem]} />
      </View>
      <View style={styles.veritcalListColumnWrapper}>
        <View style={[styles.verticalListItem]} />
        <View style={[styles.verticalListItem]} />
      </View>
      <View style={styles.veritcalListColumnWrapper}>
        <View style={[styles.verticalListItem]} />
        <View style={[styles.verticalListItem]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  veritcalListColumnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 4,
  },
  verticalListItem: {
    backgroundColor: colors.white,
    width: WINDOW_WIDTH / 2 - sizes.small,
    height: WINDOW_WIDTH / 2 - sizes.small,
  },
});
