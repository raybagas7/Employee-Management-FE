import services from "@/services/services";
import { toast } from "sonner";
import { create } from "zustand";

type State = {
  userData: IUserData | undefined;
};

type Actions = {
  setUserData: (userData: any) => void;
  getUserData: () => void;
};

export const useUser = create<State & Actions>((set) => ({
  userData: undefined,
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
}));
