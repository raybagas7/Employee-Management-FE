interface ApiResponse<T> {
  error: boolean;
  data?: T | null;
  message: any;
  code: number;
}

interface LoginPayload {
  username: string;
  password: string;
}
