import { UserInfo } from "@/types/domain/user";
import { axiosInstance } from "./axios";
import { RequestLogin } from "@/types/request/auth";
import { ResponseLogin } from "@/types/response/auth";

async function postLogin({
  OauthId,
  name,
  email,
}: RequestLogin): Promise<ResponseLogin> {
  const body = {
    oauthId: OauthId,
    email: email,
    name: name,
  };
  console.log("body", body);
  console.log(
    "process.env.EXPO_PUBLIC_SERVER_BASEURL",
    process.env.EXPO_PUBLIC_SERVER_BASEURL
  );
  const { data } = await axiosInstance.post(
    "/api/v1/signup/member/verify",
    body,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}

async function getMyInfo(): Promise<UserInfo> {
  //토큰 첨부 필요?
  const { data } = await axiosInstance.get("/signup/register");

  return data;
}

export { postLogin, getMyInfo };
