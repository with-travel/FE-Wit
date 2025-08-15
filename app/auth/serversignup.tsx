import SignupPage1 from "@/components/auth/SignupPage1";
import SignupPage2 from "@/components/auth/SignupPage2";
import SignupPage3 from "@/components/auth/SignupPage3";
import ProgressStepBar from "@/components/ProgressStepBar";
import { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
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

const signupSchema = signupSchemaPage1
  .merge(signupSchemaPage2)
  .merge(signupSchemaPage3);

function ServerSignupScreen() {
  const pagerRef = useRef<PagerView>(null);
  const totalPage = 3;
  const [pageIndex, setPageIndex] = useState(0);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
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

  const page1Fields: (keyof z.infer<typeof signupSchemaPage1>)[] = [
    "email",
    "password",
    "confirmPassword",
  ];
  const page2Fields: (keyof z.infer<typeof signupSchemaPage2>)[] = [
    "name",
    "nickname",
    "birthDate",
    "gender",
  ];
  const page3Fields: (keyof z.infer<typeof signupSchemaPage3>)[] = [
    "phoneNumber",
    "authCode",
    "agreeToTerms",
  ];

  const handleNextPage = async () => {
    let isValidPage = false;
    if (pageIndex === 0) {
      isValidPage = await trigger(page1Fields);
    } else if (pageIndex === 1) {
      isValidPage = await trigger(page2Fields);
    } else if (pageIndex === 2) {
      isValidPage = await trigger(page3Fields);
    }

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
            <CustomButton label="다음" onPress={handleNextPage} />
          ) : (
            <CustomButton
              label="완료"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
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
