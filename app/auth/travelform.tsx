// TravelFormScreen.tsx
import { colors } from "@/constants/colors";
import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import SingleSelectSection, {
  Option,
} from "@/components/auth/travelForm/SingleSelectSection";
import CustomButton from "@/components/CustomButton";

// ── 섹션 데이터 (id는 서버/전송용 key, label은 UI 표기)
const energyLevel: Option[] = [
  { id: "morning", label: "#아침형인간" },
  { id: "nightout", label: "#밤올빼미" },
  { id: "energetic", label: "#에너자이저" },
  { id: "healing", label: "#힐링모드" },
];

const goal: Option[] = [
  { id: "hotplace", label: "#핫플탐방러" },
  { id: "local", label: "#현지감성" },
  { id: "food", label: "#맛집러버" },
  { id: "activity", label: "#액티비티팡" },
  { id: "healing-priority", label: "#힐링우선" },
];

const pace: Option[] = [
  { id: "tight", label: "#타이트스케줄" },
  { id: "relaxed", label: "#여유만만" },
  { id: "spontaneous", label: "#즉흥여행" },
  { id: "plan-done", label: "#플랜준비완료" },
];

const comm: Option[] = [
  { id: "talker", label: "#수다쟁이" },
  { id: "quiet", label: "#조용한편" },
  { id: "reactive", label: "#리액션킹" },
  { id: "private", label: "#개인시간존중" },
];

const recordStyle: Option[] = [
  { id: "photo", label: "#인생샷헌터" },
  { id: "selfie-hard", label: "#셀카는못참지" },
  { id: "like-record", label: "#기록좋아" },
  { id: "view-first", label: "#눈으로만감상" },
];

const buddyStyle: Option[] = [
  { id: "leader", label: "#리더쉽발휘" },
  { id: "follower", label: "#따라가는편" },
  { id: "opinion", label: "#의견제시" },
  { id: "mood", label: "#분위기메이커" },
];

const spending: Option[] = [
  { id: "value", label: "#가성비추구" },
  { id: "worth", label: "#가치투자" },
  { id: "flex", label: "#플렉스" },
];

export default function TravelFormScreen() {
  const [energy, setEnergy] = useState<string | null>(null);
  const [tripGoal, setTripGoal] = useState<string | null>(null);
  const [tripPace, setTripPace] = useState<string | null>(null);
  const [communication, setCommunication] = useState<string | null>(null);
  const [record, setRecord] = useState<string | null>(null);
  const [buddy, setBuddy] = useState<string | null>(null);
  const [cost, setCost] = useState<string | null>(null);

  const isValid = useMemo(
    () =>
      !!(
        energy &&
        tripGoal &&
        tripPace &&
        communication &&
        record &&
        buddy &&
        cost
      ),
    [energy, tripGoal, tripPace, communication, record, buddy, cost]
  );

  const onNext = () => {
    if (!isValid) return;

    // 서버에 보낼 페이로드 예시
    const payload = {
      energy,
      goal: tripGoal,
      pace: tripPace,
      communication,
      record,
      buddy,
      spending: cost,
    };

    // TODO: 전역 상태 저장 / API 호출 / 다음 화면 이동 등
    // router.push("/next"); // expo-router 사용 시
    console.log("SUBMIT ->", payload);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          당신과 딱 맞는 동행을 위해{`\n`}여행 스타일을 알려주세요
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SingleSelectSection
          title="⚡ 에너지 레벨"
          options={energyLevel}
          value={energy}
          onChange={setEnergy}
        />

        <SingleSelectSection
          title="🎯 여행 목적"
          options={goal}
          value={tripGoal}
          onChange={setTripGoal}
        />

        <SingleSelectSection
          title="🚀 여행 페이스"
          options={pace}
          value={tripPace}
          onChange={setTripPace}
        />

        <SingleSelectSection
          title="💬 소통 스타일"
          options={comm}
          value={communication}
          onChange={setCommunication}
        />

        <SingleSelectSection
          title="📸 기록 성향"
          options={recordStyle}
          value={record}
          onChange={setRecord}
        />

        <SingleSelectSection
          title="🤝 동행 스타일"
          options={buddyStyle}
          value={buddy}
          onChange={setBuddy}
        />

        <SingleSelectSection
          title="💰 소비 패턴"
          options={spending}
          value={cost}
          onChange={setCost}
        />

        <View style={{ height: 16 }} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton label="다음" inValid={!isValid} onPress={onNext} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    marginTop: 40,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#2E7D32",
    fontFamily: "Pretendard-Regular",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
  },
});
