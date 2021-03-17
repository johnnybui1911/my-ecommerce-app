import React, {useCallback, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import images from '../../assets/images';
import Section from '../../components/Section';
import colors from '../../constants/colors';
import {SCREEN_WIDTH} from '../../constants/sizes';
import strings from '../../constants/strings';
import {BannerContext} from '../../contexts/BannerContext';
import useShowBanner from '../../hooks/useShowBanner';
import CategoriesList from './CategoriesList';
import FeaturedCollectionList from './FeaturedCollectionList';

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

function Home() {
  const context = useContext(BannerContext);
  const {setModalVisible, setBanner} = context;

  useEffect(() => {
    // removeData(STORAGE_BANNER_KEY);
  }, []);

  const onShowBanner = (banner) => {
    setModalVisible(true);
    setBanner(banner);
  };

  useShowBanner(onShowBanner);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <Section title={strings.home.sections.trendingSearches}>
              <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
                {searches.map((item, idx) => (
                  <View
                    style={{
                      width: Math.floor(SCREEN_WIDTH / 2),
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
            <Section title={strings.home.sections.featuredCollection}>
              <FeaturedCollectionList />
            </Section>
            <Section title={strings.home.sections.categories}>
              <CategoriesList />
            </Section>
          </View>
        )}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background_gray,
  },
  categoryContainer: {
    padding: 24,
    backgroundColor: colors.image_placeholder,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
