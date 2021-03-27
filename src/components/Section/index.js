import React, {memo} from 'react';
import {Text, View} from 'react-native';
import types from '../../constants/types';
import styles from './styles';

function Section({title, children, style, textStyle}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleBox}>
        <Text style={[styles.title, textStyle]}>{title ?? ''}</Text>
      </View>
      {children}
    </View>
  );
}

Section.propTypes = {
  title: types.string,
  children: types.element,
  style: types.object,
  textStyle: types.object,
};

export default memo(Section);
