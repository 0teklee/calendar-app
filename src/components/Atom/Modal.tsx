import { Dispatch, ReactNode, SetStateAction, useRef } from "react";

const Modal = ({
  children,
  setState,
}: {
  children: ReactNode;
  setState: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const modalRef = useRef(null);

  return (
    <div
      ref={modalRef}
      className="fixed top-0 left-0 w-screen h-screen bg-gray-700 z-40 bg-opacity-40 overscroll-y-none"
      onClick={(e) => {
        setState(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="fixed transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2  z-50 p-20 rounded-lg bg-white text-black"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
