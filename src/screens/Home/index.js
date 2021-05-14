import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import Animated from 'react-native-reanimated';
import apiRequest from '../../api';
import MainListItem from './VerticalList/MainListItem';
import ListHeader from './Header/ListHeader';
import ListFooter from './Footer/ListFooter';
import styles from './styles';
import {DailyTabContext} from '../../contexts/DailyTabContext';
import {PRODUCT_ITEM_HEIGHT} from '../../constants/sizes';
import PlaceholderList from '../../components/PlaceholderList.js';
import AnimatedScreenHeader from './AnimatedScreenHeader';

const {Value, event} = Animated;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function HomeScreen() {
  const tabContext = useContext(DailyTabContext);
  const {tab} = tabContext;

  const [products, setProducts] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const onEndReachedCalledDuringMomentum = useRef(true);

  const scrollY = useRef(new Value(0)).current;

  useEffect(() => {
    fetchProducts(tab);
  }, [fetchProducts, tab]);

  const fetchProducts = useCallback(async (category) => {
    // await removeData(STORAGE_BANNER_KEY);
    setLoading(true);
    setPage(1);
    setProducts([]);

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
    if (page === 1 && isLoading && products.length === 0) {
      return <PlaceholderList />;
    } else if (isLoading && products.length > 0) {
      return <ListFooter />;
    } else {
      return null;
    }
  }, [isLoading, page, products]);

  const _keyExtractor = useCallback((item, idx) => idx.toString(), []);

  return (
    <View style={styles.container}>
      <AnimatedScreenHeader {...{scrollY}} />
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
        removeClippedSubviews
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        getItemLayout={(item, index) => ({
          length: PRODUCT_ITEM_HEIGHT,
          offset: PRODUCT_ITEM_HEIGHT * index,
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default HomeScreen;
