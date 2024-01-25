import services from "@/services/services";
import { toast } from "sonner";
import { create } from "zustand";

type State = {
  userData: IUserData | undefined;
  employeeList: IEmployeeData[] | undefined;
};

type Actions = {
  setUserData: (userData: any) => void;
  getUserData: () => void;
  getEmployeeList: () => void;
};

export const useUser = create<State & Actions>((set) => ({
  userData: undefined,
  employeeList: undefined,
  setUserData: (userData) => {
    set(() => ({ userData }));
  },
  getUserData: async () => {
    const { error, data, message } = await services.getSpesificUserData();

    if (error) {
      toast.error(message.message);
    } else {
      set(() => ({ userData: data.data.user }));
    }
  },
  getEmployeeList: async () => {
    const { error, data, message } = await services.getEmployeeList();

    if (error) {
      toast.error(message.message);
    } else {
      set(() => ({ employeeList: data.data.users }));
    }
  },
}));
