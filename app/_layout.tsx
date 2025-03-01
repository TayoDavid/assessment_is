import { persistor, store } from "@/redux/store";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" />
          </Stack>
          <Toast position="bottom" />
        </PersistGate>
      </Provider>
    </>
  )
}
