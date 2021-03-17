import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import images from '../../assets/images';
import colors from '../../constants/colors';

const collections = [
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
export default function FeaturedCollectionList() {
  const _renderItem = ({item, index}) => (
    <View
      style={{
        marginLeft: 16,
        marginVertical: 16,
        borderWidth: 1,
        borderColor: colors.border_gray,
      }}>
      <View
        style={{flex: 1, flexDirection: 'row', backgroundColor: colors.white}}>
        <View>
          <Image source={images.shirt} style={{width: 150, height: 150}} />
        </View>
        <View>
          <Image source={images.shirt} style={{width: 75, height: 75}} />
          <Image source={images.shirt} style={{width: 75, height: 75}} />
        </View>
      </View>
      <View style={{padding: 16}}>
        <Text>{item.name}</Text>
        <Text>{`${item.count}k+ sold`}</Text>
      </View>
    </View>
  );
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={collections}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={_renderItem}
    />
  );
}
