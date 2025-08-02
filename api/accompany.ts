import { Accompany } from "@/types/domain/accompany";
import { axiosInstance } from "./axios";
import { RequestAccompanyList } from "@/types/request/accompany";

async function getAccompaniesList(
  body: RequestAccompanyList
): Promise<Accompany[]> {
  const { data } = await axiosInstance.get("/api/v1/accompanies", {
    headers: {
      Authorization: `Bear`,
    },
    params: {
      country: body.country,
      lastId: body.lastId,
      size: body.size,
    },
  });

  return data;
}

export { getAccompaniesList };
