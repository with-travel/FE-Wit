// TravelFormScreen.tsx
import React, { useRef, useState } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import PagerView from "react-native-pager-view";
import { router } from "expo-router";
import ProgressStepBar from "@/components/ProgressStepBar";
import CustomButton from "@/components/CustomButton";
import TravelQ1, { TravelType } from "@/components/travelQuestions/TravelQ1";
import TravelQ2, { CharacterType } from "@/components/travelQuestions/TravelQ2";
import TravelQ3, { StyleType } from "@/components/travelQuestions/TravelQ3";
import TravelQ4, { ImportantType } from "@/components/travelQuestions/TravelQ4";
import TravelQ5 from "@/components/travelQuestions/TravelQ5";
import { colors } from "@/constants/colors";

type TravelFormType = {
  travelType: TravelType;
  myCharacter: CharacterType;
  preferType: StyleType;
  importantThings: ImportantType[];
  selfIntroduce: string;
};

export default function TravelFormScreen() {
  const totalPage = 5;
  const pagerRef = useRef<PagerView>(null);

  const [pageIndex, setPageIndex] = useState(0);
  const [form, setForm] = useState<TravelFormType>({
    travelType: "" as TravelType,
    myCharacter: "" as CharacterType,
    preferType: "" as StyleType,
    importantThings: [],
    selfIntroduce: "",
  });

  const isValid = () => {
    switch (pageIndex) {
      case 0:
        return form.travelType !== "";
      case 1:
        return form.myCharacter !== "";
      case 2:
        return form.preferType !== "";
      case 3:
        return form.importantThings.length > 0;
      case 4:
        return form.selfIntroduce.trim().length > 0;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (pageIndex < totalPage - 1) {
      const next = pageIndex + 1;
      pagerRef.current?.setPage(next);
      setPageIndex(next);
    } else {
      console.log("제출 데이터:", form);
      router.replace("/");
    }
  };

  const pages = [
    <TravelQ1
      key="q1"
      selected={form.travelType}
      onSelect={(v) => setForm((f) => ({ ...f, travelType: v }))}
    />,
    <TravelQ2
      key="q2"
      selected={form.myCharacter}
      onSelect={(v) => setForm((f) => ({ ...f, myCharacter: v }))}
    />,
    <TravelQ3
      key="q3"
      questionIndex={3}
      questionText={`선호하는 여행 스타일은\n무엇인가요?`}
      selected={form.preferType}
      onSelect={(v) => setForm((f) => ({ ...f, preferType: v }))}
    />,
    <TravelQ4
      key="q4"
      questionIndex={4}
      questionText={`여행에서 제일 중요하게\n생각하는 것은 무엇인가요?`}
      selected={form.importantThings}
      onSelect={(v) =>
        setForm((f) => {
          const next = f.importantThings.includes(v)
            ? f.importantThings.filter((i) => i !== v)
            : [...f.importantThings, v];
          return { ...f, importantThings: next };
        })
      }
    />,
    <TravelQ5
      key="q5"
      value={form.selfIntroduce}
      onChange={(t) => setForm((f) => ({ ...f, selfIntroduce: t }))}
    />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressStepBar totalPage={totalPage} currentPage={pageIndex + 1} />
      {pageIndex + 1 !== 5 && (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            당신과 딱 맞는 동행을 위해 여행 설문을 시작할게요
          </Text>
        </View>
      )}
      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
      >
        {pages.map((PageComponent, idx) => (
          <View key={idx} style={styles.page}>
            {PageComponent}
          </View>
        ))}
      </PagerView>

      <View style={styles.buttonContainer}>
        <CustomButton
          label={pageIndex === totalPage - 1 ? "완료" : "다음"}
          onPress={goNext}
          //   disabled={!isValid()}
          inValid={!isValid()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  headerContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  headerText: {
    color: colors.PRIMARY_COLOR,
    fontSize: 16,
    fontWeight: "700",
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
});
