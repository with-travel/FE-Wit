import { queryClient } from "@/api/queryClient";
import useAuth from "@/hooks/queries/useAuth";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
      <Toast />
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const { auth } = useAuth();

  useEffect(() => {
    auth.id &&
      Toast.show({
        type: "success",
        text1: `환영합니다! ${auth.nickname || "회원"}님!`,
        position: "top",
        visibilityTime: 2500,
      });
  }, [auth.id, auth.nickname]);
  //auth값에 따른 분기점 설정 필요함
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {auth.id ? (
        auth.infoChecked ? (
          // ID 있고 infoChecked가 true면 메인 화면으로
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          // ID 있지만 infoChecked가 false면 추가정보 입력 화면으로
          <Stack.Screen
            name="auth/extrainfo"
            options={{ headerShown: false }}
          />
        )
      ) : (
        // ID 없으면 로그인 화면으로
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
