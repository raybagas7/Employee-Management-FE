interface IUserData {
  id: string;
  username: string;
  fullname: string;
  email: string;
  mobile_phone: string;
  place_of_birth: string;
  gender: "Male" | "Female";
  marital_status: string;
  is_admin: boolean;
  salary_id: string | null;
  salary: string | null;
  role: string | null;
}
