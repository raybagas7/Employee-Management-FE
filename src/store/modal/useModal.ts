/*eslint no-unused-vars: "off"*/
import { create } from "zustand";

type State = {
  show: boolean;
  content: React.ReactNode | null;
};

type Actions = {
  showModal: (content: React.ReactNode) => void;
  hideModal: () => void;
};

export const useModal = create<State & Actions>((set) => ({
  show: false,
  content: null,
  showModal: (content) => set(() => ({ show: true, content })),
  hideModal: () => set(() => ({ show: false })),
}));
