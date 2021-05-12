import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import images from '../../../assets/images';
import Section from '../../../components/Section';
import strings from '../../../constants/strings';
import Carousel from './Carousel';
import DailyBanner from './DailyBanner';
import FeaturedCollectionList from './FeaturedCollectionList';
import VerticalListTabHeader from './VerticalListTabHeader';
import styles from '../styles';
import {TRENDING_SEARCH} from '../../../constants/configs';

function ListHeader() {
  return (
    <View>
      <Carousel />
      <DailyBanner />
      <Section title={strings.home.sections.flashDeals}>
        <FeaturedCollectionList />
      </Section>
      <Section title={strings.home.sections.trendingSearches}>
        <View style={styles.fourItemContainer}>
          {TRENDING_SEARCH.map((item, idx) => (
            <View style={styles.fourItemStyle} key={idx.toString()}>
              <View style={styles.fourItemText}>
                <Text>{item.name}</Text>
              </View>
              <Image source={images.shirt} />
            </View>
          ))}
        </View>
      </Section>
      <Section title={strings.home.sections.featuredCollection}>
        <FeaturedCollectionList />
      </Section>
      <VerticalListTabHeader />
    </View>
  );
}

export default memo(ListHeader);
