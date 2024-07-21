import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Dimensions, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import TabIcon from './tab-icon';

import { View } from '~/components/shared';

const CustomBottomNavigation = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const TAB_COUNT = state.routes.length;
  const containerWidth = Dimensions.get('window').width;
  const TWENTY_PERCENT_OF_WIDTH = containerWidth * 0.3;
  const TAB_WIDTH = Math.min(TWENTY_PERCENT_OF_WIDTH, containerWidth / TAB_COUNT);
  const INDICATOR_WIDTH = TAB_WIDTH / 2;
  const { bottom } = useSafeAreaInsets();

  const { styles } = useStyles(style);

  const translateAnimation = useAnimatedStyle(() => {
    const centerOffset = (TAB_WIDTH - INDICATOR_WIDTH) / 2;
    return {
      transform: [
        {
          translateX: withSpring(state.index * TAB_WIDTH + centerOffset, {
            stiffness: 500,
            damping: 25,
          }),
        },
      ],
    };
  });

  const _TAB_WIDTH = INDICATOR_WIDTH / 2;

  return (
    <View
      style={[
        styles.container,
        {
          bottom: bottom + 20,
        },
      ]}>
      <View style={styles.inner}>
        <Animated.View
          style={[
            translateAnimation,
            {
              width: _TAB_WIDTH * 1.3,
              left: _TAB_WIDTH / 2.6,
              top: _TAB_WIDTH / 2.2,
            },
            styles.indicator,
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented && route.name !== 'checkout') {
              navigation.navigate(route.name, { merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}>
              <View style={{ width: TAB_WIDTH }}>
                <TabIcon route={route.name} isFocused={isFocused} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const style = createStyleSheet((theme) => ({
  container: {
    position: 'absolute',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner: {
    marginHorizontal: 20,
    height: 67,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
  },
  indicator: {
    position: 'absolute',
    // top: '25%',
    zIndex: 10,
    height: 'auto',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 999,
    backgroundColor: theme.colors.brand,
  },
  tab: {
    position: 'relative',
    flex: 1,
    zIndex: 40,
  },
  tabInner: {
    zIndex: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
}));

export default CustomBottomNavigation;
