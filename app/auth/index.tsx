import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

export default function AuthHomeScreen() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    console.log("카카오 로그인 시작");
  };

  return (
    <LinearGradient
      colors={[
        "#1F80B8",
        "#2A8F8F",
        "#359D66",
        "#919A3F",
        "#BF992C",
        "#ED9718",
        "#E27623",
        "#DD6528",
        "#D7542D",
      ]}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* 로고 */}
        <Image
          source={require("@/assets/images/WitLogoWhite.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 안내 문구 */}
        <Text style={styles.title}>
          위트와 함께{"\n"}
          여행할 준비가 되셨나요?
        </Text>

        {/* 카카오 로그인 버튼 */}
        <Pressable style={styles.kakaoButton} onPress={handleKakaoLogin}>
          <Ionicons name="chatbubble-sharp" color={"#181500"} size={20} />
          <Text style={styles.kakaoText}>카카오톡으로 시작하기</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.1,
  },
  logo: {
    width: width,
    height: height * 0.6,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 36,
  },
  kakaoButton: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE500",
    width: width - 52,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
  },
  kakaoText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "500",
  },
});
