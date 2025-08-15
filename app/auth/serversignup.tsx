import SignupPage1 from "@/components/auth/signup/SignupPage1";
import SignupPage2 from "@/components/auth/signup/SignupPage2";
import SignupPage3 from "@/components/auth/signup/SignupPage3";
import ProgressStepBar from "@/components/ProgressStepBar";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchemaPage1,
  signupSchemaPage2,
  signupSchemaPage3,
} from "@/utils/validate";
import { z } from "zod";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const signupSchema = signupSchemaPage1
  .merge(signupSchemaPage2)
  .merge(signupSchemaPage3);

function ServerSignupScreen() {
  const pagerRef = useRef<PagerView>(null);
  const totalPage = 3;
  const [pageIndex, setPageIndex] = useState(0);
  const [isPage1Valid, setIsPage1Valid] = useState(false);
  const [isPage2Valid, setIsPage2Valid] = useState(false);
  const [isPage3Valid, setIsPage3Valid] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      nickname: "",
      birthDate: undefined,
      gender: undefined,
      phoneNumber: "",
      authCode: "",
      agreeToTerms: false,
    },
  });

  const page1Fields = useMemo<(keyof z.infer<typeof signupSchemaPage1>)[]>(
    () => ["email", "password", "confirmPassword"],
    []
  );

  const page2Fields = useMemo<(keyof z.infer<typeof signupSchemaPage2>)[]>(
    () => ["name", "nickname", "birthDate", "gender"],
    []
  );

  const page3Fields = useMemo<(keyof z.infer<typeof signupSchemaPage3>)[]>(
    () => ["phoneNumber", "authCode", "agreeToTerms"],
    []
  );

  // 각 페이지별 필드 값 변경 감시
  const page1Values = watch(page1Fields);
  const page2Values = watch(page2Fields);
  const page3Values = watch(page3Fields);

  // 페이지별 유효성 검사 수행
  const validatePage = useCallback(
    async (pageNumber: number) => {
      if (pageNumber === 0) {
        const isValid = await trigger(page1Fields);
        setIsPage1Valid(isValid);
        return isValid;
      } else if (pageNumber === 1) {
        const isValid = await trigger(page2Fields);
        setIsPage2Valid(isValid);
        return isValid;
      } else if (pageNumber === 2) {
        const isValid = await trigger(page3Fields);
        setIsPage3Valid(isValid);
        return isValid;
      }
      return false;
    },
    [trigger, page1Fields, page2Fields, page3Fields]
  );

  // 페이지가 변경될 때마다 유효성 검사 수행
  useEffect(() => {
    validatePage(pageIndex);
  }, [pageIndex, page1Values, page2Values, page3Values, validatePage]);

  const handleNextPage = async () => {
    const isValidPage = await validatePage(pageIndex);

    if (isValidPage && pageIndex < totalPage - 1) {
      setPageIndex(pageIndex + 1);
      pagerRef.current?.setPage(pageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      pagerRef.current?.setPage(pageIndex - 1);
    }
  };

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    console.log("Form data submitted:", data);
    router.push("/auth/travelform");
    // Here, you would typically make an API call to register the user.
    // After successful registration, navigate to the main screen.
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ProgressStepBar totalPage={totalPage} currentPage={pageIndex + 1} />
        <PagerView
          ref={pagerRef}
          style={{ flex: 1, marginTop: 52 }}
          initialPage={0}
          scrollEnabled={false}
          onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        >
          <View key="1">
            <SignupPage1 control={control} errors={errors} />
          </View>
          <View key="2">
            <SignupPage2 control={control} errors={errors} />
          </View>
          <View key="3">
            <SignupPage3 control={control} errors={errors} />
          </View>
        </PagerView>
        <View style={styles.buttonContainer}>
          {pageIndex > 0 && (
            <CustomButton label="이전" onPress={handlePrevPage} />
          )}
          {pageIndex < totalPage - 1 ? (
            <CustomButton
              label="다음"
              onPress={handleNextPage}
              inValid={
                pageIndex === 0
                  ? !isPage1Valid
                  : pageIndex === 1
                  ? !isPage2Valid
                  : !isPage3Valid
              }
            />
          ) : (
            <CustomButton
              label="완료"
              onPress={handleSubmit(onSubmit)}
              inValid={!isPage3Valid}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default ServerSignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
