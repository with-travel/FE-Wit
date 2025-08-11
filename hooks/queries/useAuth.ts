import { getMyInfo, postLogin } from "@/api/auth";
import { queryClient } from "@/api/queryClient";
import { queryKeys, storageKeys } from "@/constants/keys";
import { removeHeader, setHeader } from "@/utils/headers";
import {
  getSecureStore,
  removeSecureStore,
  setSecureStore,
} from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

function useGetUserInfo() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMyInfo,
    queryKey: [queryKeys.AUTH, queryKeys.GET_USER_INFO],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        await getSecureStore("accessToken").then((accessToken) => {
          setHeader("Authorization", `Bearer ${accessToken}`);
        });
      } else {
        removeHeader("Authorization");
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      removeSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function usePostLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await setSecureStore(storageKeys.REFRESH_TOKEN, refreshToken);
      await setSecureStore(storageKeys.ACCESS_TOKEN, accessToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER_INFO],
      });
      router.replace("/");
    },
    onError: () => {},
  });
}

function useAuth() {
  const { data } = useGetUserInfo();
  const loginMutation = usePostLogin();

  return {
    auth: {
      id: data?.id ?? 0,
      nickname: data?.nickname ?? "",
      infoChecked: data?.infoChecked ?? false,
      email: data?.email ?? "",
      birthDate: data?.birthDate ?? "",
      gender: data?.gender ?? null,
    },
    loginMutation,
  };
}

export default useAuth;
