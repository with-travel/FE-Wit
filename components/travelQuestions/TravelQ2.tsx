import { colors } from "@/constants/colors";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

export type CharacterType = "리더형" | "조력자형" | "메이커형" | "찬성형" | "";

interface TravelQ2Props {
  selected: CharacterType;
  onSelect: (value: CharacterType) => void;
}

const TravelQ2 = ({ selected, onSelect }: TravelQ2Props) => (
  <View style={styles.container}>
    <Text style={[styles.question, { fontSize: 24 }]}>Q02.</Text>
    <Text style={styles.question}>단체에서 나의 캐릭터는 무엇인가요?</Text>
    <View style={styles.grid}>
      {(["리더형", "조력자형", "메이커형", "찬성형"] as CharacterType[]).map(
        (opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.option, selected === opt && styles.optionActive]}
            onPress={() => onSelect(opt)}
          >
            {/* 아이콘 들어가야 함 */}
            <Text style={styles.label}>{opt}</Text>
          </TouchableOpacity>
        )
      )}
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
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  grid: {
    marginTop: 34,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 24,
  },
  option: {
    width: Dimensions.get("screen").width / 2 - 32,
    height: Dimensions.get("screen").width / 2 - 32,
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
    fontSize: 16,
  },
});

export default TravelQ2;
