import { Dispatch, ReactNode } from "react";

const Modal = ({
  children,
  setState,
}: {
  children: ReactNode;
  setState: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-gray-700 z-40 bg-opacity-40`}
      onClick={() => {
        setState(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="fixed transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2  z-50 rounded-lg bg-white text-black"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
