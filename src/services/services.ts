import { axiosBase } from "./axiosBase";
import { axiosTokenized } from "./axiosTokenized";

const services = (() => {
  const postLogin = async (payload: LoginPayload) => {
    return axiosBase<any>(
      "POST",
      `${process.env.BASE_API_URL}/authentications`,
      {},
      payload,
    );
  };

  const getSpesificUserData = async () => {
    return axiosTokenized<any>(
      "GET",
      `${process.env.BASE_API_URL}/users/detail`,
      {},
    );
  };

  return {
    postLogin,
    getSpesificUserData,
  };
})();

export default services;
