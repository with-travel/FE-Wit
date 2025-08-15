import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import InputField from "../InputField";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { colors } from "@/constants/colors";

interface SignupPage2Props {
  control: Control<any>;
  errors: FieldErrors;
}

function SignupPage2({ control, errors }: SignupPage2Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="nickname"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.nickname?.message as string}
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            label="이름"
            placeholder="이름을 입력해주세요"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.name?.message as string}
          />
        )}
      />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.sectionTitle}>생년월일</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.datePickerButton}
              >
                <Text style={styles.datePickerText}>
                  {value ? value.toLocaleDateString() : "생년월일 선택"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={(
                    event: DateTimePickerEvent,
                    selectedDate?: Date
                  ) => {
                    setShowDatePicker(Platform.OS === "ios");
                    if (selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                />
              )}
              {errors.birthDate && (
                <Text style={styles.error}>
                  {errors.birthDate.message as string}
                </Text>
              )}
            </View>
          )}
        />
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.sectionTitle}>성별</Text>
              <View style={styles.genderButtons}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    value === "남자" && styles.genderButtonSelected,
                  ]}
                  onPress={() => onChange("남자")}
                >
                  <Text
                    style={
                      value === "남자" ? styles.selectedText : styles.normalText
                    }
                  >
                    남자
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    value === "여자" && styles.genderButtonSelected,
                  ]}
                  onPress={() => onChange("여자")}
                >
                  <Text
                    style={
                      value === "여자" ? styles.selectedText : styles.normalText
                    }
                  >
                    여자
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.gender && (
                <Text style={styles.error}>
                  {errors.gender.message as string}
                </Text>
              )}
            </View>
          )}
        />
      </View>
    </View>
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
  datePickerButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 15,
    justifyContent: "center",
  },
  datePickerText: {
    color: colors.GRAY_400,
  },
  genderButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  genderButtonSelected: {
    backgroundColor: colors.PRIMARY_COLOR,
  },
  selectedText: {
    color: "white",
    fontWeight: "500",
  },
  normalText: {
    color: "black",
  },
  error: {
    marginTop: 5,
    color: "red",
  },
});

export default SignupPage2;
