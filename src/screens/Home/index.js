/* eslint-disable react-native/no-inline-styles */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, FlatList, TextInput, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/colors';
import Animated from 'react-native-reanimated';
import apiRequest from '../../api';
import MainListItem from './VerticalList/MainListItem';
import ListHeader from './Header/ListHeader';
import ListFooter from './Footer/ListFooter';
import styles from './styles';
import {DailyTabContext} from '../../contexts/DailyTabContext';

const ITEM_HEIGHT = 223;

const {interpolate, Value, event, interpolateColors} = Animated;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function HomeScreen() {
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

  const headerInputBgColorAnimate = interpolateColors(scrollY, {
    inputRange: [0, 200 / 2],
    outputColorRange: [colors.white, colors.background_gray],
  });

  useEffect(() => {
    setPage(1);
    fetchProducts(tab);
  }, [fetchProducts, tab]);

  const fetchProducts = useCallback(async (category) => {
    // await removeData(STORAGE_BANNER_KEY);

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
      //
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
          styles.headerAnimationContainer,
          {
            backgroundColor: headerBgColorAnimate,
            opacity: headerOpacityAnimate,
          },
        ]}>
        <Animated.View
          style={[
            styles.headerContainer,
            {
              backgroundColor: headerInputBgColorAnimate,
            },
          ]}>
          <View style={{paddingHorizontal: 16}}>
            <Icon name="search" size={24} color={colors.gray} />
          </View>
          <TextInput
            style={styles.headerInput}
            placeholder="Skip Hop: 20% OFF"
            placeholderTextColor={colors.shopee_orange}
          />
          <View style={{paddingHorizontal: 16}}>
            <Icon name="camera" size={24} color={colors.gray} />
          </View>
        </Animated.View>
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
        columnWrapperStyle={styles.veritcalListColumnWrapper}
        // style={{}}
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

export default HomeScreen;
