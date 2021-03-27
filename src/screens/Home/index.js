/* eslint-disable react-native/no-inline-styles */
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../assets/images';
import HorizontalFlatList from '../../components/HorizontalFlatList';
import Section from '../../components/Section';
import colors from '../../constants/colors';
import {SCREEN_WIDTH, STATUS_BAR_HEIGHT} from '../../constants/sizes';
import strings from '../../constants/strings';
import {BannerContext} from '../../contexts/BannerContext';
import useShowBanner from '../../hooks/useShowBanner';
import CategoriesList from './CategoriesList';
import DailyBanner from './DailyBanner';
import DailyItem from './DailyItem';
import FeaturedCollectionList from './FeaturedCollectionList';
import Animated from 'react-native-reanimated';
import apiRequest from '../../api';
import MainListItem from './MainListItem';
import Carousel from './Carousel';
import ListHeader from './ListHeader';
import ListFooter from './ListFooter';
import VerticalListTabHeader from './VerticalListTabHeader';
import {DailyTabContext} from '../../contexts/DailyTabContext';

const ITEM_HEIGHT = 223;

const {
  interpolate,
  Value,
  event,
  interpolateColors,
  Extrapolate,
  call,
} = Animated;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function Home() {
  const bannerContext = useContext(BannerContext);
  const {setModalVisible, setBanner} = bannerContext;
  const tabContext = useContext(DailyTabContext);
  const {tab} = tabContext;

  const [products, setProducts] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const onEndReachedCalledDuringMomentum = useRef(true);

  const scrollY = useRef(new Value(0)).current;

  const headerOpacityAnimate = interpolate(scrollY, {
    inputRange: [-20, 0],
    outputRange: [0, 1],
  });

  const headerBgColorAnimate = interpolateColors(scrollY, {
    inputRange: [0, 200 / 2],
    outputColorRange: [colors.header_transparent, colors.white],
  });

  const headerIconColorAnimate = interpolateColors(scrollY, {
    inputRange: [0, 200 / 2],
    outputColorRange: [colors.white, colors.shopee_orange],
  });

  useEffect(() => {
    setPage(1);
    fetchProducts(tab);
  }, [fetchProducts, tab]);

  const fetchProducts = useCallback(async (category) => {
    setLoading(true);

    const url = category
      ? `/products?_start=0&_end=10&category=${category}`
      : '/products?_start=0&_end=10';

    try {
      const {data} = await apiRequest({
        url,
      });
      setProducts(data);
    } catch (e) {
      console.log({e});
    }

    setLoading(false);
  }, []);

  const _onRefresh = useCallback(async () => {
    try {
      setPage(1);
      setRefresh(true);

      await fetchProducts(tab);

      setRefresh(false);
    } catch (e) {
      setRefresh(false);
    }
  }, [fetchProducts, tab]);

  const onLoadMore = useCallback(async () => {
    if (page < 4 && !onEndReachedCalledDuringMomentum.current) {
      onEndReachedCalledDuringMomentum.current = true;
      setLoading(true);

      const start = page * 10;
      const end = (page + 1) * 10;

      const url = tab
        ? `/products?_start=${start}&_end=${end}&category=${tab}`
        : `/products?_start=${start}&_end=${end}`;

      try {
        const {data} = await apiRequest({
          url,
        });
        setProducts((prevData) => [...prevData, ...data]);
        setLoading(false);
      } catch (e) {
        console.log({e});
      }

      setPage((oldPage) => oldPage + 1);
      setLoading(false);
    }
  }, [page, tab]);

  const onShowBanner = (banner) => {
    setModalVisible(true);
    setBanner(banner);
  };

  useShowBanner(onShowBanner);

  const _renderItem = useCallback(({item, index}) => {
    return <MainListItem {...{item, index}} />;
  }, []);

  const _renderHeader = useCallback(() => {
    return <ListHeader />;
  }, []);

  const _renderFooter = useCallback(() => {
    return isLoading && <ListFooter />;
  }, [isLoading]);

  const _keyExtractor = useCallback((item, idx) => idx.toString(), []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            backgroundColor: headerBgColorAnimate,
            opacity: headerOpacityAnimate,
          },
        ]}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background_gray,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{paddingHorizontal: 16}}>
            <Icon name="search" size={24} color={colors.black} />
          </View>
          <TextInput
            style={{flex: 1}}
            placeholder="Skip Hop: 20% OFF"
            placeholderTextColor={colors.shopee_orange}
          />
          <View style={{paddingHorizontal: 16}}>
            <Icon name="camera" size={24} color={colors.black} />
          </View>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <AnimatedIcon
            name="shopping-cart"
            size={30}
            style={{
              color: headerIconColorAnimate,
            }}
          />
        </View>
        <View style={{paddingHorizontal: 16}}>
          <AnimatedIcon
            name="comments"
            size={30}
            style={{
              color: headerIconColorAnimate,
            }}
          />
        </View>
      </Animated.View>
      <AnimatedFlatList
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        ListHeaderComponent={_renderHeader}
        ListFooterComponent={_renderFooter}
        data={products}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        numColumns={2}
        contentContainerStyle={
          {
            // paddingHorizontal: 4,
          }
        }
        columnWrapperStyle={{
          justifyContent: 'center',
        }}
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        getItemLayout={(item, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={_onRefresh} />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.8}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
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
  sectionContainer: {marginBottom: 16},
  headerContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingTop: 16 + STATUS_BAR_HEIGHT + 16,
    flexDirection: 'row',
    zIndex: 1,
    height: 130,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    alignItems: 'center',
  },
});
