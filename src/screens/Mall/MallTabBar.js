import React, {memo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import images from '../../assets/images';
import colors from '../../constants/colors';
import styles from './styles';

function MallTabBar({tabProps}) {
  const {
    navigationState: {index, routes},
  } = tabProps;
  return (
    <View>
      <ScrollView
        // ref={}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {routes.map((route, idx) => {
          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => tabProps.jumpTo(route.key)}>
              <View
                style={[
                  styles.tabItem,
                  {
                    marginLeft: idx === 0 ? 4 : 0,
                    borderColor:
                      idx === index ? colors.shopee_orange : colors.white,
                  },
                ]}>
                <Image source={images.shirt} />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    // color: idx === index ? colors.shopee_orange : colors.black,
                  }}>
                  {route.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default memo(MallTabBar);
