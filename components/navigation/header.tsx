import { Image } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text, View } from '~/components/shared';
import useCheckoutStore from '~/store/checkout';

const topSafeArea = UnistylesRuntime.insets.top;

const Header = ({ label }: { label: string }) => {
  const { styles } = useStyles(_styles);
  const checkoutStage = useCheckoutStore((v) => v.stage);

  return (
    <View style={styles.container}>
      <Image source={require('~/assets/logo.png')} style={styles.logo} />
      {checkoutStage !== 'success' && (
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    paddingTop: topSafeArea,
    backgroundColor: theme.colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
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
}));

export default Header;
