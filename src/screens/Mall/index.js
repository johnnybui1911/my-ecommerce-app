import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {TabView} from 'react-native-tab-view';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import {SHOPPING_MALL_TAB} from '../../constants/configs';
import {WINDOW_HEIGHT} from '../../constants/sizes';
import MallProductScene from './MallProductScene';
import MallTabBar from './MallTabBar';
import styles from './styles';

function MallScreen() {
  const [tabIndex, setTabIndex] = useState(0);

  const renderScene = useCallback(({route}) => {
    // Optimize large number of routes
    // only render 2 tab scene of each side
    // if (Math.abs(tabIndex - routes.indexOf(route)) >= 2) {
    //   return null;
    // }
    return <MallProductScene categoryId={route.categoryId} />;
  }, []);

  const renderTabBar = useCallback((props) => {
    const {
      navigationState: {index},
    } = props;
    return <MallTabBar currIndex={index} jumpTo={props.jumpTo} />;
  }, []);

  return (
    <View style={styles.container}>
      <Header
        inputProps={{
          placeholder: 'Shopee Mall',
          placeholderTextColor: colors.red,
        }}
      />
      <TabView
        navigationState={{index: tabIndex, routes: SHOPPING_MALL_TAB}}
        onIndexChange={setTabIndex}
        initialLayout={{width: WINDOW_HEIGHT}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export default MallScreen;
