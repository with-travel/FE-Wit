import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ViewStyle } from "react-native";

interface ProgressStepBarProps {
  totalPage: number;
  currentPage: number;
}

const ProgressStepBar: React.FC<ProgressStepBarProps> = ({
  totalPage,
  currentPage,
}) => {
  const anim = useRef(new Animated.Value(currentPage)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: currentPage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentPage, anim]);
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPage }).map((_, idx) => {
        const width = anim.interpolate({
          inputRange: [idx, idx + 1],
          outputRange: ["0%", "100%"],
          extrapolate: "clamp",
        });

        return (
          <View key={idx} style={styles.stepContainer}>
            <Animated.View style={[styles.step, { width } as ViewStyle]} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    width: "100%",
    height: 4,
  },
  stepContainer: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 2,
    overflow: "hidden",
  },
  step: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
});

export default ProgressStepBar;
