import { colors } from "@/constants/colors";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

export type TravelType = "계획파" | "즉흥파" | "";

interface Props {
  selected: TravelType;
  onSelect: (v: TravelType) => void;
}

const TravelQ1 = ({ selected, onSelect }: Props) => (
  <View style={styles.container}>
    <Text style={[styles.question, {}]}>Q.01</Text>
    <Text style={styles.question}>
      여행 일정 계획은 어떻게 진행하는 편인가요?
    </Text>
    <View style={styles.optionsRow}>
      {(["계획파", "즉흥파"] as TravelType[]).map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[styles.option, selected === opt && styles.optionActive]}
          onPress={() => onSelect(opt)}
        >
          {/* 아이콘 들어가야 함 */}
          <Text style={styles.label}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
  },
  optionsRow: {
    marginTop: 46,
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  option: {
    width: Dimensions.get("screen").width / 2 - 32,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.2,
  },
  optionActive: {
    borderColor: colors.PRIMARY_COLOR,
    shadowOpacity: 0.5,
  },
  label: {
    marginTop: 8,
    color: "#333",
  },
});

export default TravelQ1;
