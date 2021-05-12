import React, {memo, useContext, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import images from '../../../assets/images';
import Section from '../../../components/Section';
import colors from '../../../constants/colors';
import {VERTICAL_LIST_TAB_HEADERS} from '../../../constants/configs';
import {SCREEN_WIDTH} from '../../../constants/sizes';
import strings from '../../../constants/strings';
import {DailyTabContext} from '../../../contexts/DailyTabContext';
import {storeCoordinates, tabCoordinates} from '../coordinates';

function areEqual(prevProps, nextProps) {
  // minimize the item component re-rendering - at most 2 item is re-rendered
  if (
    prevProps.item.id === nextProps.item.id &&
    nextProps.tab === nextProps.item.id &&
    prevProps.tab !== nextProps.item.id
  ) {
    return false;
  } else if (prevProps.tab === prevProps.item.id) {
    return false;
  }

  return true;
}

const VerticalListTabHeaderItem = memo(function VerticalListTabHeaderItem({
  item,
  idx,
  tab,
  setTab,
}) {
  console.log('VerticalListTabHeaderItem is rendered');
  return (
    <TouchableWithoutFeedback
      key={`${idx}_${item.name}`}
      onPress={() => {
        setTab && setTab(item.id);
      }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: colors.white,
          marginVertical: 4,
          width: 100,
          height: 120,
          marginRight: 4,
          marginLeft: idx === 0 ? 4 : 0,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: tab === item.id ? colors.shopee_orange : colors.white,
        }}>
        <Image source={images.shirt} />
        <Text style={{fontSize: 8, textAlign: 'center'}}>{item.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
},
areEqual);

const TAB_WIDTH = (100 + 4) * 600 + 4;

function VerticalListTabHeader() {
  console.log('VerticalListTabHeader is rendered');
  const scrollViewRef = useRef(null);
  const context = useContext(DailyTabContext);
  const {tab, setTab} = context;

  return (
    <Section title={strings.home.sections.dailyDiscover}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: colors.border_gray}}
        onLayout={(event) => {
          const {nativeEvent} = event;
          console.log('scrollview', nativeEvent);
        }}>
        {VERTICAL_LIST_TAB_HEADERS.map((item, idx) => (
          <TouchableWithoutFeedback
            key={`${idx}_${item.name}`}
            onPress={() => {
              setTab && setTab(item.id);
              if (tabCoordinates.hasOwnProperty(item.id)) {
                const coord = tabCoordinates[item.id];
                const scrollToX = coord.x - Math.floor(SCREEN_WIDTH / 3);
                scrollViewRef.current.scrollTo({
                  x: scrollToX,
                  animated: true,
                });
              }
            }}
            onLayout={(event) => {
              const {
                nativeEvent: {
                  layout: {x, y},
                },
              } = event;
              storeCoordinates(item.id, {x, y});
            }}>
            <View
              style={{
                paddingVertical: 8,
                backgroundColor: colors.white,
                marginVertical: 4,
                width: 100,
                height: 120,
                marginRight: 4,
                marginLeft: idx === 0 ? 4 : 0,
                alignItems: 'center',
                borderWidth: 1,
                borderColor:
                  tab === item.id ? colors.shopee_orange : colors.white,
              }}>
              <Image source={images.shirt} />
              <Text style={{fontSize: 12, textAlign: 'center'}}>
                {item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </Section>
  );
}
export default memo(VerticalListTabHeader);
