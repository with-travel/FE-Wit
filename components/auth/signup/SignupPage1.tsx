import React from "react";
import { StyleSheet, View } from "react-native";
import InputField from "../../InputField";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface SignupPage1Props {
  control: Control<any>;
  errors: FieldErrors;
}

function SignupPage1({ control, errors }: SignupPage1Props) {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="이메일 주소"
            placeholder="ID@example.com"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.email?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.password?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="비밀번호 확인"
            placeholder="비밀번호를 한번 더 입력해주세요"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            error={errors.confirmPassword?.message as string}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignupPage1;
