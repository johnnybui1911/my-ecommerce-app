import React from 'react';
import FastImage from 'react-native-fast-image';

export default function OptimizedImage({
  resizeMode = 'contain',
  ...otherProps
}) {
  const _resizeMode = FastImage.resizeMode[resizeMode];

  return <FastImage resizeMode={_resizeMode} {...otherProps} />;
}
