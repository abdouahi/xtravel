import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sing-up" options={{ headerShown: false }} />
      <Stack.Screen name="sing-in" options={{ headerShown: false }} />
      {/* Remove this line if it exists */}
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
};

export default Layout;