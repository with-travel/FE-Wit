import { colors } from "@/constants/colors";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

export type StyleType = "부지런 + 활발" | "여유 + 느긋" | "";

interface TravelQ3Props {
  questionIndex: number;
  questionText: string;
  selected: StyleType;
  onSelect: (value: StyleType) => void;
}

const TravelQ3 = ({
  questionIndex,
  questionText,
  selected,
  onSelect,
}: TravelQ3Props) => (
  <View style={styles.container}>
    <Text style={[styles.question, { fontSize: 24 }]}>Q.0{questionIndex}</Text>
    <Text style={styles.question}>{questionText}</Text>
    <View style={styles.optionsRow}>
      {(["부지런 + 활발", "여유 + 느긋"] as StyleType[]).map((opt) => (
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
  container: { flex: 1, padding: 16 },
  question: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  optionsRow: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    width: Dimensions.get("screen").width / 2 - 24,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.2,
  },
  optionActive: {
    shadowOpacity: 0.5,
    borderColor: colors.PRIMARY_COLOR,
  },
  label: {
    marginTop: 8,
    color: "#333",
    fontSize: 16,
  },
});

export default TravelQ3;
