import { router } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Pressable
        onPress={() => router.replace("/auth")}
        style={{
          backgroundColor: "BE4121",
        }}
      >
        <Text>홈스크린</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
