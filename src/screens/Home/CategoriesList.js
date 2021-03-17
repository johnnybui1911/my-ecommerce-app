import React from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import images from '../../assets/images';
import colors from '../../constants/colors';

const categories = [
  {
    id: 1,
    name: "Men's Wear",
  },
  {
    id: 2,
    name: "Women's Apparel",
  },
  {
    id: 3,
    name: 'Mobile & Gadgets',
  },
  {
    id: 4,
    name: 'Home Appliances',
  },
  {
    id: 5,
    name: 'Toys',
  },
  {
    id: 6,
    name: 'Kids Fashion',
  },
];

function groupCategoriesByColumn(categories = []) {
  let categoriesByColumn = [];

  let group = [];

  for (let i = 0; i < categories.length; i++) {
    group.push(categories[i]);

    if (i % 2 !== 0 || i === categories.length - 1) {
      categoriesByColumn.push(group);
      group = [];
    }
  }

  return categoriesByColumn;
}
export default function CategoriesList() {
  const _renderColumn = ({item, index}) => {
    return <View style={{}}>{_renderItem(item)}</View>;
  };

  const _renderItem = (items) => {
    return items.map((item) => (
      <View
        key={item.id}
        style={{
          paddingVertical: 16,
          paddingHorizontal: 24,
          alignItems: 'center',
        }}>
        <View style={styles.categoryContainer}>
          <Image
            source={images.shirt}
            style={{width: 80, height: 80, borderRadius: 80 / 2}}
            resizeMode="cover"
          />
        </View>
        <Text>{item?.name}</Text>
      </View>
    ));
  };

  const formatCategories = groupCategoriesByColumn(categories);

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={formatCategories}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={_renderColumn}
    />
  );
}

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
