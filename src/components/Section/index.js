import React, {memo} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

function Section({title, children}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title ?? ''}</Text>
      </View>
      {children}
    </View>
  );
}

export default memo(Section);
