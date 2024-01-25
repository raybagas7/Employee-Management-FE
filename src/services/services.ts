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

  const deleteAccessToken = async (payload: LogoutPayload) => {
    return axiosTokenized<any>(
      "DELETE",
      `${process.env.BASE_API_URL}/authentications`,
      {},
      payload,
    );
  };

  const postRegisterNewEmployee = async (payload: any) => {
    return axiosTokenized<any>(
      "POST",
      `${process.env.BASE_API_URL}/users`,
      {},
      payload,
    );
  };

  const getEmployeeList = async () => {
    return axiosTokenized<any>("GET", `${process.env.BASE_API_URL}/users`, {});
  };

  return {
    postLogin,
    getSpesificUserData,
    deleteAccessToken,
    postRegisterNewEmployee,
    getEmployeeList,
  };
})();

export default services;