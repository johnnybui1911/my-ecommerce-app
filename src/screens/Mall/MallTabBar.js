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
import {SHOPPING_MALL_TAB} from '../../constants/configs';
import styles from './styles';

function areEqual(prevProps, nextProps) {
  // minimize the item component re-rendering - at most 2 item is re-rendered
  if (
    prevProps.idx === nextProps.idx &&
    nextProps.currIndex === nextProps.idx &&
    prevProps.currIndex !== nextProps.idx
  ) {
    return false;
  } else if (prevProps.currIndex === prevProps.idx) {
    return false;
  }

  return true;
}

function MallTabItem({jumpTo, currIndex, idx, routeKey, title}) {
  return (
    <TouchableWithoutFeedback onPress={() => jumpTo(routeKey)}>
      <View
        style={[
          styles.tabItem,
          {
            marginLeft: idx === 0 ? 4 : 0,
            borderColor:
              idx === currIndex ? colors.shopee_orange : colors.white,
          },
        ]}>
        <Image source={images.shirt} />
        <Text
          style={{
            fontSize: 12,
            textAlign: 'center',
            // color: idx === index ? colors.shopee_orange : colors.black,
          }}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const MemoTabItem = memo(MallTabItem, areEqual);

function MallTabBar({currIndex, jumpTo}) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {SHOPPING_MALL_TAB.map((route, idx) => {
          return (
            <MemoTabItem
              key={route.key}
              routeKey={route.key}
              jumpTo={jumpTo}
              currIndex={currIndex}
              idx={idx}
              title={route.title}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default memo(MallTabBar);
