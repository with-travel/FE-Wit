import React from "react";
import { View, Text, StyleSheet } from "react-native";
import OptionChip from "./OptionChip";

export type Option = { id: string; label: string };

type SingleSelectSectionProps = {
  title: string;
  options: Option[];
  value: string | null; // 선택된 option id
  onChange: (id: string) => void; // 단일 선택
};

export default function SingleSelectSection({
  title,
  options,
  value,
  onChange,
}: SingleSelectSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.rowWrap}>
        {options.map((opt) => (
          <OptionChip
            key={opt.id}
            label={opt.label}
            selected={value === opt.id}
            onPress={() => onChange(opt.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
