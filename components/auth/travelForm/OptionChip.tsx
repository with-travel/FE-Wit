import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";

type OptionChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function OptionChip({
  label,
  selected,
  onPress,
  style,
}: OptionChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
        style,
      ]}
      android_ripple={{ color: "#e6e6e6" }}
    >
      <Text
        style={[
          styles.chipText,
          selected ? styles.chipTextSelected : styles.chipTextUnselected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 12,
    marginBottom: 12,
  },
  chipUnselected: {
    backgroundColor: "#FFF",
    borderColor: "#E6E6E6",
  },
  chipSelected: {
    backgroundColor: "#3BB273", // 초록(예시) — 필요시 바꿔도 됨
    borderColor: "#3BB273",
  },
  chipText: {
    fontSize: 15,
  },
  chipTextUnselected: {
    color: "#333",
  },
  chipTextSelected: {
    color: "#FFF",
    fontWeight: "600",
  },
});
