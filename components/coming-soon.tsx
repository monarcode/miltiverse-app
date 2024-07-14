import { Text, View } from 'components/shared';
import { useStyles } from 'react-native-unistyles';

const ComingSoon = () => {
  const { theme } = useStyles();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
      <Text>Coming Soon</Text>
    </View>
  );
};
export default ComingSoon;
