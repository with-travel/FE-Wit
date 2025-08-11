type ResponseLogin = {
  accessToken: string;
  refreshToken: string;
  infoChecked: boolean;
};

type tokenDto = {
  accessToken: string;
  refreshToken: string;
};

type MemberSigninDto = {
  id: number;
  email: string;
  nickname: string;
  birthDate: string;
  gender: "MALE" | "FEMALE";
  infoChecked: boolean;
};

type ResponseUserInfo = MemberSigninDto;

export { ResponseLogin, ResponseUserInfo };
