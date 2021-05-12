import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import images from '../../../assets/images';
import HorizontalFlatList from '../../../components/HorizontalFlatList';
import Section from '../../../components/Section';
import colors from '../../../constants/colors';
import {SCREEN_WIDTH} from '../../../constants/sizes';
import strings from '../../../constants/strings';
import DailyItem from './DailyItem';

const searches = [
  {
    id: 1,
    name: 'Feeding & Nursing',
    count: 146,
  },
  {
    id: 2,
    name: 'Casual Shorts',
    count: 58,
  },
  {
    id: 3,
    name: 'Feeding & Nursing',
    count: 146,
  },
  {
    id: 4,
    name: 'Casual Shorts',
    count: 58,
  },
];
function DailyBanner() {
  console.log('Daily Banner is rendered');
  return (
    <View style={{paddingHorizontal: 16, backgroundColor: colors.white}}>
      <Image
        source={images.discountBanner}
        style={{width: SCREEN_WIDTH - 16 * 2}}
      />
      <Section
        title={strings.home.sections.dailyDetal}
        style={{
          marginBottom: 16,
          backgroundColor: colors.red,
        }}
        textStyle={{
          color: colors.white,
          fontWeight: 'bold',
        }}>
        <HorizontalFlatList
          contentContainerStyle={{
            backgroundColor: colors.red,
            paddingHorizontal: 4,
          }}
          data={searches}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({item, index}) => <DailyItem {...{item, index}} />}
        />
      </Section>
    </View>
  );
}
export default memo(DailyBanner);
