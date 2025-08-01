import { Tabs } from "expo-router";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { StyleSheet, View } from "react-native";
import LogoIcon from "@/assets/icons/LogoIcon.svg";
import LogoTextIcon from "@/assets/icons/LogoText.svg";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="house" color={color} />
          ),
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <LogoIcon height={32} />
              <LogoTextIcon />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginLeft: 12,
  },
});
