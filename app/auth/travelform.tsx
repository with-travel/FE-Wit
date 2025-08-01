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

// **1**: React Hook Form import
import { useForm, SubmitHandler } from "react-hook-form";
// **2**: API 요청용 라이브러리 (원하는 것으로 교체)
import axios from "axios";
import Toast from "react-native-toast-message";

type TravelFormType = {
  travelType: TravelType;
  myCharacter: CharacterType;
  preferType: StyleType;
  importantThings: ImportantType[];
  selfIntroduce: string;
};

export default function TravelFormScreen() {
  const pagerRef = useRef<PagerView>(null);
  const totalPage = 5;
  const [pageIndex, setPageIndex] = useState(0);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid },
  } = useForm<TravelFormType>({
    mode: "onChange",
    defaultValues: {
      travelType: "" as TravelType,
      myCharacter: "" as CharacterType,
      preferType: "" as StyleType,
      importantThings: [] as ImportantType[],
      selfIntroduce: "",
    },
  });

  const isStepValid = () => {
    switch (pageIndex) {
      case 0:
        return watch("travelType") !== "";
      case 1:
        return watch("myCharacter") !== "";
      case 2:
        return watch("preferType") !== "";
      case 3:
        return watch("importantThings").length > 0;
      case 4:
        return watch("selfIntroduce").trim().length > 0;
      default:
        return false;
    }
  };

  const onSubmit: SubmitHandler<TravelFormType> = async (data) => {
    console.log("data", data);
    try {
      await axios.post("https://your.api/travel-form", data);
      Toast.show({
        position: "top",
        text1: "회원가입 절차가 완료되었습니다.",
        type: "success",
      });
      router.replace("/");
    } catch (error) {
      Toast.show({
        position: "top",
        text1: "데이터 전송에 실패했습니다. 다시 시도해주세요.",
        type: "error",
      });
      console.error("서버 전송 에러:", error);
    }
  };

  // **6**: 다음 페이지로 이동 or 최종 제출
  const goNext = () => {
    if (pageIndex < totalPage - 1) {
      const next = pageIndex + 1;
      pagerRef.current?.setPage(next);
      setPageIndex(next);
    } else {
      // 마지막 단계, handleSubmit 호출
      handleSubmit(onSubmit)();
    }
  };

  const pages = [
    <TravelQ1
      key="q1"
      selected={watch("travelType")}
      onSelect={(v) => setValue("travelType", v, { shouldValidate: true })}
    />,
    <TravelQ2
      key="q2"
      selected={watch("myCharacter")}
      onSelect={(v) => setValue("myCharacter", v, { shouldValidate: true })}
    />,
    <TravelQ3
      key="q3"
      questionIndex={3}
      questionText={`선호하는 여행 스타일은\n무엇인가요?`}
      selected={watch("preferType")}
      onSelect={(v) => setValue("preferType", v, { shouldValidate: true })}
    />,
    <TravelQ4
      key="q4"
      questionIndex={4}
      questionText={`여행에서 제일 중요하게\n생각하는 것은 무엇인가요?`}
      selected={watch("importantThings")}
      onSelect={(v) => {
        const arr = watch("importantThings");
        const next = arr.includes(v) ? arr.filter((i) => i !== v) : [...arr, v];
        setValue("importantThings", next, { shouldValidate: true });
      }}
    />,
    <TravelQ5
      key="q5"
      value={watch("selfIntroduce")}
      onChange={(t) => setValue("selfIntroduce", t, { shouldValidate: true })}
    />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ProgressStepBar totalPage={totalPage} currentPage={pageIndex + 1} />

      {pageIndex + 1 !== totalPage && (
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
        {pages.map((Page, idx) => (
          <View key={idx} style={styles.page}>
            {Page}
          </View>
        ))}
      </PagerView>

      <View style={styles.buttonContainer}>
        <CustomButton
          label={pageIndex === totalPage - 1 ? "완료" : "다음"}
          onPress={goNext}
          inValid={!isStepValid()}
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
