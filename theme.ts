const colors = {
  white: '#ffffff',
  azureRadiance: '#007AFF',
  limedSpruce: '#38434D',
  cornflowerBlue: '#6366F1',
  astral: '#2E78B7',
  background: 'rgba(250, 250, 250, 1.0)',
  light: '#FAFAFA',
  brand: 'rgba(255, 127, 125,1.0)',
  dark: 'rgba(252, 250, 248, 0.03)',
  slideBg: 'rgba(26, 26, 26, 0.376)',
  gray: 'rgba(237, 237, 237, 0.67)',
  text: '#2A2A2A',
} as const;

const fontFamily = {
  sliderTitle: 'Dirty-Line',
  'Sora-Regular': 'Sora-Regular',
  '300': 'Montserrat_300Light',
  '400': 'Montserrat_400Regular',
  '500': 'Montserrat_500Medium',
  '600': 'Montserrat_600SemiBold',
} as const;

const fontSizes = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const lightTheme = {
  colors,
  fontFamily,
  fontSizes,
  components: {
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    separator: {
      height: 1,
      marginVertical: 30,
      width: '80%',
      backgroundColor: 'grey',
    },
    button: {
      alignItems: 'center',
      backgroundColor: colors.cornflowerBlue,
      borderRadius: 24,
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {
        height: 2,
        width: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.limedSpruce,
      fontSize: 36,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
  },
  margins: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    '4xl': 32,
  },
} as const;
