import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {TabView} from 'react-native-tab-view';
import Header from '../../components/Header';
import colors from '../../constants/colors';
import {WINDOW_HEIGHT} from '../../constants/sizes';
import MallProductScene from './MallProductScene';
import MallTabBar from './MallTabBar';
import styles from './styles';

const routes = [
  {key: 'category1', title: 'First', categoryId: 0},
  {key: 'category2', title: 'Second', categoryId: 1},
  {key: 'category3', title: 'First', categoryId: 2},
  {key: 'category4', title: 'Second', categoryId: 3},
  {key: 'category5', title: 'First', categoryId: 4},
];

function MallScreen() {
  const [tabIndex, setTabIndex] = useState(0);

  const renderScene = useCallback(
    ({route}) => {
      // Optimize large number of routes
      // only render 2 tab scene of each side
      if (Math.abs(tabIndex - routes.indexOf(route)) >= 2) {
        return null;
      }
      return <MallProductScene categoryId={route.categoryId} />;
    },
    [tabIndex],
  );

  const renderTabBar = useCallback(
    (props) => <MallTabBar tabProps={props} />,
    [],
  );

  return (
    <View style={styles.container}>
      <Header
        inputProps={{
          placeholder: 'Shopee Mall',
          placeholderTextColor: colors.red,
        }}
      />
      <TabView
        navigationState={{index: tabIndex, routes}}
        onIndexChange={setTabIndex}
        initialLayout={{width: WINDOW_HEIGHT}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

export default MallScreen;
