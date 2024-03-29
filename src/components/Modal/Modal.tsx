import { useModal } from "@/store/modal/useModal";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ backDropClose }: ModalProps) => {
  const { show, content, hideModal } = useModal();

  if (!show) {
    return null;
  }

  const clickOutsidePropagation = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={backDropClose ? hideModal : () => {}}
      className="fixed inset-0 top-0 z-[120] flex h-[100dvh] w-[100dvw] items-center justify-center bg-background/40 backdrop-blur-sm max-md:px-5"
    >
      <div
        onClick={(e) => clickOutsidePropagation(e)}
        className="animate-quantum_bouncing flex max-w-[95dvw] flex-col rounded-lg border-[1px] border-border bg-background p-2 shadow"
      >
        <button
          onClick={hideModal}
          className="self-end rounded-full transition-colors duration-300 hover:bg-red-500 hover:text-white "
        >
          <AiOutlineCloseCircle className="h-5 w-5" />
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;
