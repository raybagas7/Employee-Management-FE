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

interface LogoutPayload {
  refreshToken: string;
}

interface IemployeeInformationPage {
  userInformation: IUserData;
}

interface IAttendanceList {
  attend_id: string;
  status: string;
  date_log: string;
}
