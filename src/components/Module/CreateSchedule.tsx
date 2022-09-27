import Modal from "@components/Atom/Modal";
import React, { Dispatch, useRef } from "react";

const CreateSchedule = ({
  setState,
}: {
  setState: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<{
    title: string;
    category: string;
    description: string;
  }>({
    title: "",
    category: "",
    description: "",
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { value, id } = e.target;
    inputRef.current = { ...inputRef.current, [id]: value };
  };

  const handleSubmit = (): void => {
    // fetch();
  };

  return (
    <Modal setState={setState}>
      <form>
        <div className="w-80">
          <h2 className="mb-4">제목</h2>
          <input
            type="text"
            id="title"
            onChange={handleInput}
            className="w-80 mb-4 p-3 border border-gray-400 rounded-lg"
          />
          <h2 className="mb-4">장소</h2>
          <input
            type="text"
            id="location"
            onChange={handleInput}
            className="w-80 mb-4 p-3 border border-gray-400 rounded-lg"
          />
          <h2 className="mb-4 ">설명</h2>
          <textarea
            id="description"
            className="resize-none w-80 h-40 mb-4 p-3 border border-gray-400 rounded-lg"
            onChange={handleInput}
          />
        </div>
        <button
          type="submit"
          id="description"
          className="mt-6 p-3 text-white rounded-lg bg-blue-600 "
          onClick={(e) => {
            e.preventDefault();
            console.log(inputRef.current);
          }}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default CreateSchedule;
