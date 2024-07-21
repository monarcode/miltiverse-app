import { useMemo, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import ProductCard from './product-card';

import { View } from '~/components/shared';
import { Product } from '~/types/products';

const screenWidth = UnistylesRuntime.screen.width;
const slideWidth = screenWidth - 40; // 20px spacing on each side
const slideSpacing = 20;
const columnWidth = (slideWidth - slideSpacing) / 2 + 6;

const ProductsSlider = ({ products }: { products: Product[] | undefined }) => {
  const { styles } = useStyles(_styles);
  const flatListRef = useRef<FlatList<Product[]>>(null);
  const scrollX = useSharedValue(0);
  const { theme } = useStyles();

  // Renders a slide with a product card for each item in the array.
  const renderSlide = ({ item }: { item: Product[]; index: number }) => (
    <View style={styles.slide}>
      {item.map((subItem) => (
        <View key={subItem.id} style={styles.columnWrapper}>
          <ProductCard
            product={{
              description: subItem.description ?? '',
              id: subItem.id,
              image: subItem.photos?.[0]?.url ?? '',
              price: Number(subItem.current_price?.[0]?.NGN?.[0]?.toString()) ?? 0,
              title: subItem.name,
            }}
          />
        </View>
      ))}
    </View>
  );

  // inline component to animate the dot
  const AnimatedDot = ({ index }: { index: number; totalSlides?: number }) => {
    const animatedValue = useSharedValue(0);

    useAnimatedReaction(
      () => scrollX.value,
      (scrollValue) => {
        const inputRange = [(index - 1) * slideWidth, index * slideWidth, (index + 1) * slideWidth];
        animatedValue.value = interpolate(scrollValue, inputRange, [0, 1, 0], 'clamp');
      },
      [index]
    );

    const dotStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        animatedValue.value,
        [0, 1],
        ['transparent', theme.colors.brand]
      );
      const borderColor = interpolateColor(
        animatedValue.value,
        [0, 1],
        ['#bbb', theme.colors.brand]
      );
      const width = interpolate(animatedValue.value, [0, 1], [11, 12]);
      const height = interpolate(animatedValue.value, [0, 1], [11, 12]);

      return {
        backgroundColor,
        borderColor,
        width,
        height,
      };
    });

    return <Animated.View style={[styles.paginationDot, dotStyle]} />;
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  /**
   * Groups the data into chunks of 2 items each.
   *
   * @returns An array of arrays, where each inner array represents a chunk of data.
   */
  const groupedProducts = useMemo(() => {
    if (!products) return [];
    return products.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 2);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      if (resultArray[chunkIndex].length < 2) {
        resultArray[chunkIndex].push(item);
      } else {
        resultArray.push([item]); // Start a new group if the current one is full
      }
      return resultArray;
    }, [] as Product[][]);
  }, [products]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={groupedProducts || []}
        renderItem={renderSlide}
        showsHorizontalScrollIndicator={false}
        snapToInterval={slideWidth + slideSpacing}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        scrollEventThrottle={24}
        keyExtractor={(item) => item.map((subItem) => subItem.id).join('-')}
        horizontal
        pagingEnabled
      />
      <View style={styles.pagination}>
        {groupedProducts.map((_, index) => (
          <AnimatedDot key={index} index={index} />
        ))}
      </View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    minHeight: 180,
  },
  flatListContent: {
    paddingHorizontal: slideSpacing / 2,
  },
  slide: {
    width: slideWidth,
    height: '100%',
    flexDirection: 'row',
    marginHorizontal: slideSpacing / 2,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  columnWrapper: {
    width: columnWidth,
    height: '100%',
    paddingHorizontal: slideSpacing / 4,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: slideWidth,
  },
  columnText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -32,
    left: 0,
    right: 0,
  },
  paginationDot: {
    borderRadius: 6,
    marginHorizontal: 4,
    borderWidth: 0.8,
  },
}));

export default ProductsSlider;
