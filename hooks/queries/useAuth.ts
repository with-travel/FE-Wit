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

function useGetMyInfo() {
  const { data, isError, isSuccess } = useQuery({
    queryFn: getMyInfo,
    queryKey: [queryKeys.AUTH, queryKeys.GET_MY_INFO],
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
        queryKey: [queryKeys.AUTH, queryKeys.GET_MY_INFO],
      });
      router.replace("/");
    },
    onError: () => {},
  });
}

function useAuth() {
  const { data } = useGetMyInfo();
  const loginMutation = usePostLogin();

  return {
    auth: {
      id: data?.id ?? 0,
      nickname: data?.nickname ?? "",
    },
    loginMutation,
  };
}

export default useAuth;
