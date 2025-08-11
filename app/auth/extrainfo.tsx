import InputField from "@/components/InputField";
import ProgressStepBar from "@/components/ProgressStepBar";
import { SafeAreaView, StyleSheet } from "react-native";

export default function ExtraInfoScreen() {
  return (
    <SafeAreaView>
      <ProgressStepBar totalPage={1} currentPage={1} />
      <InputField label="닉네임" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
