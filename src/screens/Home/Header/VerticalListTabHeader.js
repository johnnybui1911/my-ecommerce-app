import React, {memo, useContext, useRef, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {useCallback} from 'react/cjs/react.development';
import images from '../../../assets/images';
import Section from '../../../components/Section';
import colors from '../../../constants/colors';
import {VERTICAL_LIST_TAB_HEADERS} from '../../../constants/configs';
import {SCREEN_WIDTH} from '../../../constants/sizes';
import strings from '../../../constants/strings';
import {DailyTabContext} from '../../../contexts/DailyTabContext';
import {tabCoordinates} from '../coordinates';
import styles from '../styles';

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
  onPress,
}) {
  const tabStyle = useMemo(
    () => ({
      marginLeft: idx === 0 ? 4 : 0,
      borderColor: tab === item.id ? colors.shopee_orange : colors.white,
    }),
    [idx, tab, item],
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[tabStyle, styles.tabItem]}>
        <Image source={images.shirt} />
        <Text style={{fontSize: 12, textAlign: 'center'}}>{item.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
},
areEqual);

// Use Context to pass data through deep-nested component without having to pass props down at every level
// -> avoid unneccessary re-rendering of ListHeader with multiple horizontal lists
// -> only re-render products vertical list tab and product vertical list
// -> need to define context outside of Home screen because if other states are updated -> that context is re-executed -> make VerticalListTabHeader re-render
function VerticalListTabHeader() {
  console.log('VerticalListTabHeader is rendered');
  const scrollViewRef = useRef(null);
  const context = useContext(DailyTabContext);
  const {tab, setTab} = context;

  // closure: avoid inline function definition
  const _onTabPress = useCallback(
    (id) => (e) => {
      setTab && setTab(id);
      if (tabCoordinates.hasOwnProperty(id)) {
        const coord = tabCoordinates[id];
        const offset = Math.floor(SCREEN_WIDTH / 3);
        const scrollToX = coord.x - offset; // scroll horizontal list to always keep focused tab on viewport
        scrollViewRef.current.scrollTo({
          x: scrollToX,
          animated: true,
        });
      }
    },
    [setTab],
  );

  return (
    <Section title={strings.home.sections.dailyDiscover}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{backgroundColor: colors.border_gray}}>
        {VERTICAL_LIST_TAB_HEADERS.map((item, idx) => (
          <VerticalListTabHeaderItem
            key={`${idx}_${item.name}`}
            {...{item, idx, tab, setTab}}
            onPress={_onTabPress(item.id)}
          />
        ))}
      </ScrollView>
    </Section>
  );
}
export default memo(VerticalListTabHeader);
