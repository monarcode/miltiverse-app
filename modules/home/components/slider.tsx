import { useRef } from 'react';
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';

const screenWidth = UnistylesRuntime.screen.width;
const slideWidth = screenWidth - 40; // 20px spacing on each side
const slideSpacing = 20;

interface SlideItem {
  id: string;
  title: string;
  body: string;
  image: any;
}

const data: SlideItem[] = [
  {
    id: '1',
    title: 'New Arrivals',
    body: 'Fresh out the workshop',
    image: require('~/assets/images/slider-1.png'),
  },
  {
    id: '2',
    title: 'On Sale',
    body: 'Great discounts on popular items',
    image: require('~/assets/images/slider-2.png'),
  },
];

const Slider = () => {
  const { styles } = useStyles(_styles);
  const flatListRef = useRef<FlatList<SlideItem>>(null);
  const scrollX = useSharedValue(0);
  const { theme } = useStyles();

  const renderItem = ({ item }: { item: SlideItem }) => (
    <View style={styles.slide}>
      <View style={styles.textContainer}>
        <Text style={[styles.title]}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  const AnimatedDot = ({ index }: { index: number }) => {
    const dotStyle = useAnimatedStyle(() => {
      const inputRange = [(index - 1) * slideWidth, index * slideWidth, (index + 1) * slideWidth];
      const width = interpolate(scrollX.value, inputRange, [8, 18, 8], 'clamp');
      const backgroundColor = interpolateColor(scrollX.value, inputRange, [
        theme.colors.light,
        theme.colors.brand,
        theme.colors.light,
      ]);
      return {
        width: withTiming(width, { duration: 300 }),
        backgroundColor: withTiming(backgroundColor, { duration: 300 }),
      };
    });

    return <Animated.View style={[styles.paginationDot, dotStyle]} />;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={slideWidth + slideSpacing}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <AnimatedDot key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    height: 180,
  },
  flatListContent: {
    paddingHorizontal: slideSpacing / 2,
  },
  slide: {
    width: slideWidth,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: theme.colors.slideBg,
    marginHorizontal: slideSpacing / 2,
    borderRadius: 8,
    overflow: 'hidden',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingLeft: 20,
  },
  image: {
    width: '50%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingTop: 20,
  },
  title: {
    marginBottom: 8,
    color: theme.colors.white,
    fontSize: 32,
    fontFamily: theme.fontFamily['sliderTitle'],
  },
  body: {
    fontSize: 14,
    color: theme.colors.white,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.brand,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: theme.colors.brand,
  },
}));

export default Slider;
