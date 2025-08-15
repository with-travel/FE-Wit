import { z } from "zod";

export const signupSchemaPage1 = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하이어야 합니다."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const signupSchemaPage2 = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 2자 이상이어야 합니다.")
    .max(8, "닉네임은 8자 이하이어야 합니다."),
  birthDate: z.instanceof(Date, { message: "생년월일을 입력해주세요." }),
  gender: z.enum(["남자", "여자"], {
    invalid_type_error: "성별을 선택해주세요.",
  }),
  name: z.string().min(1, "이름을 입력해주세요."),
});

export const signupSchemaPage3 = z.object({
  phoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, "휴대폰 번호 형식이 올바르지 않습니다."),
  authCode: z.string().length(6, "인증번호는 6자리여야 합니다."),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "약관에 동의해주세요.",
  }),
});
