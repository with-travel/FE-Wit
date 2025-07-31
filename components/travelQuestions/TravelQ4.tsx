import { colors } from "@/constants/colors";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

export type ImportantType =
  | "맛집 탐방"
  | "문화 탐방"
  | "사진 찍기"
  | "풍경 즐기기"
  | "쇼핑"
  | "스포츠"
  | "";

interface TravelQ4Props {
  questionIndex: number;
  questionText: string;
  selected: ImportantType[];
  onSelect: (value: ImportantType) => void;
}

const TravelQ4 = ({
  questionIndex,
  questionText,
  selected,
  onSelect,
}: TravelQ4Props) => (
  <View style={styles.container}>
    <Text style={[styles.question, { fontSize: 24 }]}>Q.0{questionIndex}</Text>
    <Text style={styles.question}>{questionText}</Text>
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.grid}>
        {(
          [
            "맛집 탐방",
            "문화 탐방",
            "사진 찍기",
            "풍경 즐기기",
            "쇼핑",
            "스포츠",
          ] as ImportantType[]
        ).map((opt) => {
          const isSel = selected.includes(opt);
          const disabled = !isSel && selected.length >= 6;
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                isSel && styles.optionActive,
                disabled && styles.optionDisabled,
              ]}
              onPress={() => !disabled && onSelect(opt)}
              disabled={disabled}
            >
              {/* 아이콘 들어ㅏㄱ야 함 */}
              <Text style={styles.label}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  option: {
    width: Dimensions.get("screen").width / 2 - 24,
    height: Dimensions.get("screen").width / 2 - 24,
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginBottom: 16,
  },
  optionActive: {
    shadowOpacity: 0.5,
    borderColor: colors.PRIMARY_COLOR,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  label: {
    marginTop: 8,
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TravelQ4;
