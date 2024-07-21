import { router } from 'expo-router';
import { ArrowLeft } from 'iconsax-react-native';
import { ReactNode } from 'react';
import { Pressable } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import useCheckoutStore from '~/store/checkout';

const topSafeArea = UnistylesRuntime.insets.top;

const PlainHeader = ({ label, link }: { label: string; link?: ReactNode }) => {
  const { styles, theme } = useStyles(_styles);
  const checkoutStage = useCheckoutStore((v) => v.stage);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <ArrowLeft color={theme.colors.text} size={24} />
      </Pressable>
      {checkoutStage !== 'success' && (
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
      <View style={styles.linkWrapper}>{link}</View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    paddingTop: topSafeArea,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  labelWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 12,
  },
  label: {
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fontFamily[600],
  },
  logo: { width: 120, height: 40, objectFit: 'contain', borderWidth: 1 },
  linkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    paddingHorizontal: theme.margins['3xl'],
  },
}));

export default PlainHeader;
