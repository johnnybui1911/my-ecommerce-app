import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, RefreshControl, Text} from 'react-native';
import apiRequest from '../../api';
import {PRODUCT_ITEM_HEIGHT} from '../../constants/sizes';
import MainListItem from '../Home/VerticalList/MainListItem';
import styles from './styles';

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function multipleProducts(products) {
  let newProducts = [];
  for (let i = 0; i < 50; i++) {
    newProducts = [...newProducts, ...products];
  }
  return newProducts;
}

export default function MallProductScene({categoryId}) {
  const [products, setProducts] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // track whether component is mounted
  // this is why we need to move complex async logic out of components
  const isMounted = React.useRef(true);

  useEffect(() => {
    setPage(1);
    fetchProducts(categoryId);

    return () => {
      console.log('Clear category ' + categoryId);
      isMounted.current = false;
    };
  }, [fetchProducts, categoryId]);

  const fetchProducts = useCallback(async (category) => {
    setLoading(true);

    const url = `/products?_start=0&_end=4&category=${category}`;

    try {
      const {data} = await apiRequest({
        url,
      });
      // if (isMounted.current) {
      setProducts(data);
      // }
    } catch (e) {
      //
    }

    setLoading(false);
  }, []);

  const onLoadMore = useCallback(async () => {
    if (page < 4 && !isLoading) {
      console.log('load more ' + categoryId + ' page ' + page);
      setLoading(true);

      const start = page * 4;
      const end = (page + 1) * 4;

      const url = `/products?_start=${start}&_end=${end}&category=${categoryId}`;

      try {
        const {data} = await apiRequest({
          url,
        });
        setProducts((prevData) => [...prevData, ...data]);
      } catch (e) {
        //}
      }

      setPage((oldPage) => oldPage + 1);
      setLoading(false);
    }
  }, [page, categoryId, isLoading]);

  const _onRefresh = useCallback(async () => {
    try {
      setPage(1);
      setRefresh(true);

      await fetchProducts(categoryId);

      setRefresh(false);
    } catch (e) {
      setRefresh(false);
    }
  }, [fetchProducts, categoryId]);

  const _renderItem = useCallback(({item, index}) => {
    return <MainListItem {...{item, index}} />;
  }, []);

  const _renderFooter = useCallback(() => {
    return isLoading ? (
      <Text style={styles.listLoading}>Loading ...</Text>
    ) : null;
  }, [isLoading]);

  const _keyExtractor = useCallback((item, idx) => idx.toString(), []);
  return (
    <View style={styles.tabSceneContainer}>
      <FlatList
        ListFooterComponent={_renderFooter}
        contentContainerStyle={styles.verticalListContainer}
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
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
