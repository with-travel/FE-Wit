import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface TravelQ5Props {
  value: string;
  onChange: (text: string) => void;
}

const TravelQ5 = ({ value, onChange }: TravelQ5Props) => (
  <View style={styles.container}>
    <Text style={styles.question}>
      마지막으로,{`\n`}자기소개서를 작성해 주세요!
    </Text>
    <Text style={styles.subText}>
      자세히 작성할 수록 좋은 동행을 찾을 확률이 높아져요.
    </Text>
    <TextInput
      style={styles.textInput}
      placeholder="예) 저는 여행 중 사진 찍는 걸 좋아해요"
      multiline
      value={value}
      onChangeText={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 16,
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  subText: {
    fontSize: 15,
    color: "#808080",
    marginBottom: 30,
  },
  textInput: {
    height: 300,
    backgroundColor: "#F0F0F0",
    borderRadius: 6,
    padding: 12,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333",
  },
});

export default TravelQ5;
