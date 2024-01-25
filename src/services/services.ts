import { axiosBase } from "./axiosBase";

const services = (() => {
  const postLogin = async (payload: LoginPayload) => {
    return axiosBase<any>(
      "POST",
      `${process.env.BASE_API_URL}/authentications`,
      {},
      payload,
    );
  };

  return {
    postLogin,
  };
})();

export default services;
