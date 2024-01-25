import axios, { AxiosResponse, AxiosError } from "axios";

export async function axiosBase<T>(
  method: string,
  url: string,
  config: any,
  data?: any,
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      ...config,
    });

    return {
      error: false,
      data: response.data,
      message: response.statusText,
      code: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData: any = axiosError.response.data;
        return {
          error: true,
          data: null,
          message: errorData.message,
          code: axiosError.response.status,
        };
      }
    }

    return {
      error: true,
      data: null,
      message: "Server Error",
      code: 500,
    };
  }
}
