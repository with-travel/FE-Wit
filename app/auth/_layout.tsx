import { Stack } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";

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
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="travelform"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </FormProvider>
  );
}
