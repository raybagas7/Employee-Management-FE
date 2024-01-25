interface IUserData {
  id: string;
  username: string;
  fullname: string;
  email: string;
  mobile_phone: string;
  birth_date: string;
  place_of_birth: string;
  gender: "Male" | "Female";
  marital_status: string;
  is_admin: boolean;
  salary_id: string | null;
  salary: string | null;
  role: string | null;
  profile_img: string;
}
interface IEmployeeData {
  id: string;
  fullname: string;
  email: string;
  mobile_phone: string;
  birth_date: string;
  place_of_birth: string;
  gender: "Male" | "Female";
  marital_status: string;
  is_admin: boolean;
  salary_id: string | null;
  salary: string | null;
  role: string | null;
  profile_img: string;
}
