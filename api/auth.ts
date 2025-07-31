import { UserInfo } from "@/types/domain/user";
import { axiosInstance } from "./axios";
import { RequestLogin } from "@/types/request/auth";
import { ResponseLogin } from "@/types/response/auth";

async function postLogin({
  OauthId,
  name,
  nickname,
  email,
  gender,
  birth,
}: RequestLogin): Promise<ResponseLogin> {
  const { data } = await axiosInstance.post("/signup/register");

  return data;
}

async function getMyInfo(): Promise<UserInfo> {
  //토큰 첨부 필요?
  const { data } = await axiosInstance.get("/signup/register");

  return data;
}

export { postLogin, getMyInfo };
