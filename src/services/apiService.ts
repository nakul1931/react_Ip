import { showToast } from "../utils/showToast";
import { domain, IEndpoint } from "../constants/apiEndpoints";
import myStore from "../utils/myStore";
import { requestRefresh } from "./authService";
import { baseApiReturn } from "../interfaces";

const apiService = async <T extends baseApiReturn>(
  endpoint: IEndpoint,
  payload: Object = {},
  slug: string = ""
): Promise<T | false> => {
  const url = domain + endpoint.url + slug;

  try {
    const r = await fetch(url, {
      method: endpoint.method,
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": myStore.accessToken,
      },
      body: endpoint.method === "post" ? JSON.stringify(payload) : undefined,
    });

    const toJson = await r.json();
    console.log(toJson);

    if (!toJson.success) {
      if (toJson.message === "jwt expired") {
        const r = await requestRefresh();

        if (!r) return false;
        return apiService(endpoint);
      }

      showToast(toJson.message, "error");
      return false;
    }

    return toJson;
  } catch (e) {
    console.log(e);
    showToast("Unexpected Error, Please try later", "error");

    return false;
  }
};

export { apiService };
