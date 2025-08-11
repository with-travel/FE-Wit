import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import WebView, {
  WebViewMessageEvent,
  WebViewNavigation,
} from "react-native-webview";
import axios from "axios";
import useAuth from "@/hooks/queries/useAuth";
import { colors } from "@/constants/colors";
import { useNavigation } from "expo-router";

const REDIRECT_URI = `${
  Platform.OS === "ios"
    ? "http://localhost:8081/auth/oauth/kakao"
    : "http://10.0.2.2:8081/auth/oauth/kakao"
}`;

function KakaoLoginScreen() {
  const navigation = useNavigation();
  const { loginMutation } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isChangeNavigate, setIsChangeNavigate] = useState(true);
  const handleOnMessage = (event: WebViewMessageEvent) => {
    console.log("handleOnMessage");
    if (event.nativeEvent.url.includes(`${REDIRECT_URI}?code=`)) {
      const code = event.nativeEvent.url.replace(`${REDIRECT_URI}?code=`, "");

      requestToken(code);
    }
  };

  const requestToken = async (code: string) => {
    const response = await axios({
      method: "post",
      url: "https://kauth.kakao.com/oauth/token",
      params: {
        grant_type: "authorization_code",
        client_id: process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      },
    });

    console.log(response.data);
    loginMutation.mutate(response.data.access_token);
  };

  const handleNavigationChangeState = (event: WebViewNavigation) => {
    const isMatched = event.url.includes(`${REDIRECT_URI}?code=`);
    setIsLoading(isMatched);
    setIsChangeNavigate(event.loading);
  };

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading || isChangeNavigate) && (
        <View style={styles.kakaoLoadingContainer}>
          <ActivityIndicator size={"large"} color={colors.UNCHANGED_BLACK} />
        </View>
      )}
      <WebView
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        onMessage={handleOnMessage}
        injectedJavaScript={"window.ReactNativeWebView.postMessage('')"}
        onNavigationStateChange={handleNavigationChangeState}
      />
    </SafeAreaView>
  );
}

export default KakaoLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kakaoLoadingContainer: {
    backgroundColor: colors.UNCHANGED_WHITE,
    height: Dimensions.get("window").height,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
