import React, {memo, useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import apiRequest from '../../api';
import styles from './styles';
import {DataProvider} from 'recyclerlistview';
import VerticalListView, {
  LayoutUtil,
} from '../../components/VerticalListView.js';
import ProductView from '../../components/ProductView';

function MallProductScene({categoryId}) {
  const [products, setProducts] = useState([]);
  const [isRefresh, setRefresh] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  // RecyclerListView Config
  const [recyclerListState, setRecyclerListState] = useState({
    layoutProvider: LayoutUtil.getLayoutProvider(),
    dataProvider: new DataProvider((r1, r2) => {
      return r1 !== r2;
    }),
  });

  useEffect(() => {
    setPage(1);
    fetchProducts(categoryId);
  }, [fetchProducts, categoryId]);

  const fetchProducts = useCallback(async (category) => {
    setLoading(true);

    const url = `/products?_start=0&_end=4&category=${category}`;

    try {
      const {data} = await apiRequest({
        url,
      });

      setProducts(data);
      setRecyclerListState((prevState) => {
        const _dataProvider = prevState.dataProvider.cloneWithRows(data);
        return {
          ...prevState,
          dataProvider: _dataProvider,
        };
      });
    } catch (e) {
      //
    }

    setLoading(false);
  }, []);

  const onLoadMore = useCallback(async () => {
    console.log('load more');
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
        onUpdateProducts(data);
      } catch (e) {
        //}
      }

      setPage((oldPage) => oldPage + 1);
      setLoading(false);
    }
  }, [page, categoryId, isLoading, onUpdateProducts]);

  const onUpdateProducts = useCallback(
    (newProducts) => {
      const mergeProducts = [...products, ...newProducts];
      setProducts(mergeProducts);
      setRecyclerListState((prevState) => {
        const _dataProvider = prevState.dataProvider.cloneWithRows(
          mergeProducts,
        );
        return {
          ...prevState,
          dataProvider: _dataProvider,
        };
      });
    },
    [products],
  );

  const _onRefresh = useCallback(async () => {
    try {
      setPage(1);
      setRefresh(true);

      await fetchProducts(categoryId);
    } catch (e) {}
    setRefresh(false);
  }, [fetchProducts, categoryId]);

  const _renderFooter = useCallback(() => {
    return isLoading ? (
      <Text style={styles.listLoading}>Loading ...</Text>
    ) : null;
  }, [isLoading]);

  const _renderItemRecyclerView = useCallback((type, data) => {
    return <ProductView item={data} />;
  }, []);

  return (
    <View style={styles.tabSceneContainer}>
      <VerticalListView
        rowRenderer={_renderItemRecyclerView}
        state={recyclerListState}
        listData={products}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={isRefresh} onRefresh={_onRefresh} />
        // }
        renderFooter={_renderFooter}
      />
    </View>
  );
}

export default memo(MallProductScene);
