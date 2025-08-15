import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";
import { colors } from "@/constants/colors";

type AuthForm = {
  oAuthId: string;
  name: string;
  nickname: string;
  email: string;
  gender: string;
  birth: string;
};

export default function AuthLayout() {
  const form = useForm<AuthForm>({
    defaultValues: {
      oAuthId: "",
      name: "",
      nickname: "",
      email: "",
      gender: "",
      birth: "",
    },
  });

  return (
    <FormProvider {...form}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.UNCHANGED_WHITE,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="kakaologin"
          options={{
            headerShown: true,
            headerTitle: "",
            headerLeft: () => (
              <Pressable>
                <AntDesign name="left" size={24} color="black" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="serverlogin"
          options={{
            headerShown: true,
            headerTitle: "로그인",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <AntDesign name="left" size={24} color="black" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="serversignup"
          options={{
            headerShown: true,
            headerTitle: "회원가입",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <AntDesign name="left" size={24} color="black" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="extrainfo"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="travelform"
          options={{
            headerShown: true,
            headerTitle: "여행 설문",
            headerLeft: () => (
              <Pressable onPress={() => router.back()}>
                <AntDesign name="left" size={24} color="black" />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </FormProvider>
  );
}
