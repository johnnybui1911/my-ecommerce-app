import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {View, Text, Image, StyleSheet, PixelRatio} from 'react-native';
import {WINDOW_WIDTH, sizes} from '../../../constants/sizes';
import colors from '../../../constants/colors';

const carouselItems = [
  {
    title: 'Item 1',
    text: 'Text 1',
    image:
      'https://images.unsplash.com/photo-1620750722956-eff01b8db791?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Item 2',
    text: 'Text 2',
    image:
      'https://images.unsplash.com/photo-1620760585173-4991b791ac64?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Item 3',
    text: 'Text 3',
    image:
      'https://images.unsplash.com/photo-1620800390262-00f3ff478212?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Item 4',
    text: 'Text 4',
    image:
      'https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Item 5',
    text: 'Text 5',
    image:
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1778&q=80',
  },
  {
    title: 'Item 5',
    text: 'Text 5',
    image:
      'https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Item 6',
    text: 'Text 6',
    image:
      'https://images.unsplash.com/photo-1567521463850-4939134bcd4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1267&q=80',
  },
  {
    title: 'Item 7',
    text: 'Text 7',
    image:
      'https://images.unsplash.com/photo-1510548470459-83d740bff5de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80',
  },
];

// get a higher resolution image if you are on a high pixel density device
const scaleW = PixelRatio.getPixelSizeForLayoutSize(WINDOW_WIDTH);
const scaleH = PixelRatio.getPixelSizeForLayoutSize(220);

function CarouselItem({item, index}) {
  return (
    <View style={styles.slide}>
      <Image
        source={{
          uri: item.image,
          width: scaleW,
          height: scaleH,
        }}
        style={{height: 220, width: WINDOW_WIDTH}}
      />
    </View>
  );
}

const MemoCarouselItem = memo(CarouselItem);

function HomeCarousel() {
  const [slideIdx, setSlideIdx] = useState(0);
  const carousel = useRef(null);

  const renderItem = useCallback(
    ({item, index}) => {
      // lazy load, load at most 3 item, current, left and right item
      const diff = Math.abs(index - slideIdx);
      return diff >= 2 ? null : <MemoCarouselItem {...{item, index}} />;
    },
    [slideIdx],
  );

  const _onSnapToItem = useCallback(
    (idx) => {
      setSlideIdx(idx);
    },
    [setSlideIdx],
  );

  return (
    <View>
      <Carousel
        ref={carousel}
        data={carouselItems}
        renderItem={renderItem}
        sliderWidth={WINDOW_WIDTH}
        itemWidth={WINDOW_WIDTH}
        removeClippedSubviews
        containerCustomStyle={{backgroundColor: colors.white}}
        inactiveSlideScale={1}
        initialNumToRender={3}
        onSnapToItem={_onSnapToItem}
      />
      <Pagination
        activeDotIndex={slideIdx}
        dotsLength={carouselItems.length}
        containerStyle={styles.paginationContainer}
        renderDots={(activeIndex, total, context) => (
          <View style={styles.pagination}>
            {carouselItems.map((item, idx) => {
              return activeIndex === idx ? (
                <View
                  key={`${item.title}_${idx}`}
                  style={styles.paginationDot}
                />
              ) : (
                <Text
                  key={`${item.title}_${idx}`}
                  style={styles.paginationDotAlt}>
                  -
                </Text>
              );
            })}
          </View>
        )}
      />
    </View>
  );
}

export default memo(HomeCarousel);

const styles = StyleSheet.create({
  slide: {
    height: 220,
  },
  title: {},
  paginationDot: {
    borderWidth: 1,
    width: sizes.small,
    height: sizes.small,
    borderRadius: sizes.small / 2,
    backgroundColor: colors.header_transparent,
    marginRight: sizes.small / 2,
    borderColor: colors.white,
  },
  paginationDotAlt: {color: colors.white, marginRight: sizes.small / 2},
  pagination: {
    flexDirection: 'row',
    height: sizes.medium,
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -sizes.medium,
  },
});
