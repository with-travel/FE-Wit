import { axiosInstance } from "./axios";

async function kakaoLogin() {
  const { data } = await axiosInstance.post("");

  return data;
}

export { kakaoLogin };
