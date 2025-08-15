import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { Control, Controller, FieldErrors } from "react-hook-form";
import InputField from "../../InputField";
import Checkbox from "expo-checkbox";
import { colors } from "@/constants/colors";
import CustomButton from "@/components/CustomButton";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface SignupPage3Props {
  control: Control<any>;
  errors: FieldErrors;
}

function SignupPage3({ control, errors }: SignupPage3Props) {
  const [isAuthSent, setIsAuthSent] = useState(false);

  const handlePhoneAuth = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsAuthSent(true);
    // Here you would typically call an API to send the auth code
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = ("" + text).replace(/\D/g, "");
    const match = cleaned.match(/^(010|011|016|017|018|019)(\d{3,4})(\d{4})$/);
    if (match) {
      return [match[1], match[2], match[3]].join("-");
    }
    return text;
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              label="휴대폰 인증"
              placeholder="핸드폰 번호를 입력해주세요."
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatPhoneNumber(text))}
              value={value}
              keyboardType="phone-pad"
              maxLength={13}
              error={errors.phoneNumber?.message as string}
            />
          )}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <CustomButton
          label="인증 요청"
          onPress={handlePhoneAuth}
          style={styles.authButton}
        />
      </View>

      {isAuthSent && (
        <View style={styles.authCodeContainer}>
          <Controller
            control={control}
            name="authCode"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputField
                label="인증번호 입력"
                placeholder="인증번호 입력"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
                maxLength={6}
                error={errors.authCode?.message as string}
              />
            )}
          />
        </View>
      )}

      <View style={styles.termsContainer}>
        <ScrollView style={styles.termsContent}>
          <Text style={styles.termsTitle}>약관</Text>
        </ScrollView>
        <Controller
          control={control}
          name="agreeToTerms"
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={value}
                onValueChange={onChange}
                color={value ? colors.PRIMARY_COLOR : undefined}
              />
              <Text style={styles.checkboxLabel}>약관에 동의합니다.</Text>
            </View>
          )}
        />
        {errors.agreeToTerms && (
          <Text style={styles.error}>
            {errors.agreeToTerms.message as string}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 20,
  },
  authButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  authCodeContainer: {
    marginBottom: 20,
  },
  termsContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 60,
  },
  termsContent: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    height: 250,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  error: {
    marginTop: 5,
    color: "red",
  },
});

export default SignupPage3;
