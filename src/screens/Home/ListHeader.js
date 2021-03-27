import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import images from '../../assets/images';
import Section from '../../components/Section';
import styles from '../../components/Section/styles';
import colors from '../../constants/colors';
import {SCREEN_WIDTH} from '../../constants/sizes';
import strings from '../../constants/strings';
import Carousel from './Carousel';
import CategoriesList from './CategoriesList';
import DailyBanner from './DailyBanner';
import FeaturedCollectionList from './FeaturedCollectionList';
import VerticalListTabHeader from './VerticalListTabHeader';

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

function ListHeader() {
  console.log('ListHeader is rendered');
  return (
    <View>
      <Carousel />
      <DailyBanner />
      <Section
        style={styles.sectionContainer}
        title={strings.home.sections.flashDeals}>
        <FeaturedCollectionList />
      </Section>
      <Section
        style={styles.sectionContainer}
        title={strings.home.sections.trendingSearches}>
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {searches.map((item, idx) => (
            <View
              style={{
                width: Math.floor(SCREEN_WIDTH / 2 - 16),
                padding: 16,
              }}
              key={idx.toString()}>
              <View style={{flex: 1}}>
                <Text>{item.name}</Text>
              </View>
              <Image source={images.shirt} />
            </View>
          ))}
        </View>
      </Section>
      <Section
        style={styles.sectionContainer}
        title={strings.home.sections.featuredCollection}>
        <FeaturedCollectionList />
      </Section>
      <VerticalListTabHeader />
    </View>
  );
}

export default memo(ListHeader);
