import { createStyleSheet, useStyles } from 'react-native-unistyles';

import ChipIcon from '~/assets/icons/chip.svg';
import { Text, View } from '~/components/shared';
import useCheckoutStore from '~/store/checkout';

const CardPreview = () => {
  const { styles } = useStyles(_styles);
  const cardDetails = useCheckoutStore((v) => v.cardDetails);

  return (
    <View style={styles.container}>
      <View style={[styles.circle, { top: '-30%', right: 40 }]} />
      <View style={[styles.circle, { top: '-10%', right: '-20%' }]} />
      <Text style={styles.brand}>VISA</Text>

      <View style={styles.body}>
        <Text style={styles.cardNumber}>{cardDetails.cardNumber}</Text>

        <View style={{ flexDirection: 'row', gap: 24 }}>
          <View style={{ rowGap: 2 }}>
            <Text style={styles.label}>Card holder name</Text>
            <Text style={styles.value}>Hafsat Ardo</Text>
          </View>

          <View style={{ rowGap: 2 }}>
            <Text style={styles.label}>Expiry date</Text>
            <Text style={styles.value}>{cardDetails.cardCvv}</Text>
          </View>
        </View>
      </View>

      <View style={styles.chip}>
        <ChipIcon />
      </View>
    </View>
  );
};

const _styles = createStyleSheet((theme) => ({
  container: {
    height: 220,
    width: '100%',
    borderRadius: 12,
    backgroundColor: 'rgba(42, 42, 42, 0.95)',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 150,
    height: 'auto',
    backgroundColor: 'rgba(250, 250, 250, 0.25)',
    aspectRatio: 1,
    borderRadius: 999,
  },
  brand: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fontFamily[500],
    position: 'absolute',
    top: 20,
    right: 20,
  },
  body: {
    marginTop: 'auto',
    padding: 20,
    rowGap: 22,
  },
  cardNumber: {
    color: theme.colors.white,
    fontSize: theme.fontSizes['2xl'],
    fontFamily: theme.fontFamily[500],
  },
  label: {
    color: theme.colors.white,
    fontSize: 11,
    fontFamily: theme.fontFamily[400],
  },
  value: {
    color: theme.colors.white,
    fontSize: 13,
    fontFamily: theme.fontFamily[600],
  },
  chip: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
}));

export default CardPreview;
