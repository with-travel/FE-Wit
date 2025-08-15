import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import InputField from "../../InputField";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { colors } from "@/constants/colors";
import CustomButton from "@/components/CustomButton";

interface SignupPage2Props {
  control: Control<any>;
  errors: FieldErrors;
}

function SignupPage2({ control, errors }: SignupPage2Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() - 20
  );
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  // 연도 배열 생성 (현재 연도부터 100년 전까지)
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  // 월 배열 생성 (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 선택된 연도와 월에 따라 일 배열 업데이트
  useEffect(() => {
    const daysCount = new Date(selectedYear, selectedMonth, 0).getDate();
    setDaysInMonth(Array.from({ length: daysCount }, (_, i) => i + 1));
  }, [selectedYear, selectedMonth]);

  // 날짜 선택 완료 시 Date 객체 생성
  const handleDateConfirm = (onChange: (date: Date) => void) => {
    const selectedDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
    onChange(selectedDate);
    setShowDatePicker(false);
  };

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
                  {value
                    ? value.toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "생년월일 선택"}
                </Text>
              </TouchableOpacity>

              <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalContainer}>
                  <View style={styles.pickerContainer}>
                    <View style={styles.pickerHeader}>
                      <Text style={styles.pickerTitle}>생년월일 선택</Text>
                    </View>

                    <View style={styles.pickerContent}>
                      {/* 연도 선택 */}
                      <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>연도</Text>
                        <Picker
                          selectedValue={selectedYear}
                          onValueChange={(itemValue) =>
                            setSelectedYear(itemValue)
                          }
                          style={styles.picker}
                          itemStyle={styles.pickerItem}
                        >
                          {years.map((year) => (
                            <Picker.Item
                              key={year}
                              label={`${year}년`}
                              value={year}
                            />
                          ))}
                        </Picker>
                      </View>

                      {/* 월 선택 */}
                      <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>월</Text>
                        <Picker
                          selectedValue={selectedMonth}
                          onValueChange={(itemValue) =>
                            setSelectedMonth(itemValue)
                          }
                          style={styles.picker}
                          itemStyle={styles.pickerItem}
                        >
                          {months.map((month) => (
                            <Picker.Item
                              key={month}
                              label={`${month}월`}
                              value={month}
                            />
                          ))}
                        </Picker>
                      </View>

                      {/* 일 선택 */}
                      <View style={styles.pickerColumn}>
                        <Text style={styles.pickerLabel}>일</Text>
                        <Picker
                          selectedValue={selectedDay}
                          onValueChange={(itemValue) =>
                            setSelectedDay(itemValue)
                          }
                          style={styles.picker}
                          itemStyle={styles.pickerItem}
                        >
                          {daysInMonth.map((day) => (
                            <Picker.Item
                              key={day}
                              label={`${day}일`}
                              value={day}
                            />
                          ))}
                        </Picker>
                      </View>
                    </View>

                    <View style={styles.pickerActions}>
                      <CustomButton
                        label="취소"
                        onPress={() => setShowDatePicker(false)}
                        variant="outlined"
                        style={styles.pickerButton}
                      />
                      <CustomButton
                        label="확인"
                        onPress={() => handleDateConfirm(onChange)}
                        style={styles.pickerButton}
                      />
                    </View>
                  </View>
                </View>
              </Modal>

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
    color: colors.UNCHANGED_BLACK,
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
  // 모달 및 피커 스타일
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 0,
  },
  pickerHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  pickerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  pickerColumn: {
    flex: 1,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 14,
    marginVertical: 8,
    color: colors.UNCHANGED_BLACK,
  },
  picker: {
    width: "100%",
    height: 180,
  },
  pickerItem: {
    fontSize: 16,
  },
  pickerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  pickerButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default SignupPage2;
