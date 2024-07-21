import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../unistyles';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
  tabs: {
    initialRouteName: '(home)',
  },
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  // TODO: remove unused fonts
  const [loaded, error] = useFonts({
    'Sora-Light': require('../assets/fonts/SofiaProLight.ttf'),
    'Sora-Regular': require('../assets/fonts/SofiaProRegular.ttf'),
    'Sora-Bold': require('../assets/fonts/SofiaProBold.ttf'),
    'Sora-SemiBold': require('../assets/fonts/SofiaProSemiBold.ttf'),
    'Sora-Medium': require('../assets/fonts/SofiaProMedium.ttf'),
    'Dirty-Line': require('../assets/fonts/DirtyLine.otf'),
  });
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, fontsLoaded]);

  if (!loaded || (!fontsLoaded && !error)) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product" options={{ headerShown: false }} />
        <Stack.Screen name="wishlist" options={{ headerShown: false }} />
        <Stack.Screen name="order-history" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
