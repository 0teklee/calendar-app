import React, { Dispatch, useEffect, useRef } from "react";

import Modal from "components/Atom/Modal";
import CustomGoogleLogin from "components/Module/CustomGoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

import postEventFormat from "libs/postEventFormat";
import { ICreateProps, IPostEventBody } from "libs/types/CalendarTypes";
import { apiKey, calendarId, clientId } from "libs/apiConfig";
import { gapiPostEvent } from "libs/gapi";

const CreateSchedule = ({
  setState,
  start,
  end,
}: {
  setState: Dispatch<React.SetStateAction<boolean>>;
  start: Date;
  end: Date;
}) => {
  const inputRef = useRef<ICreateProps>({
    title: "",
    location: "",
    description: "",
    start: start.toLocaleString("sv-SE").slice(0, 16),
    end: end.toLocaleString("sv-SE").slice(0, 16),
  });

  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.value = inputRef.current.end;
    }

    if (startRef.current) {
      startRef.current.value = inputRef.current.start;
    }
  }, []);

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { value, id } = e.target;
    inputRef.current = { ...inputRef.current, [id]: value };
  };

  return (
    <Modal setState={setState}>
      <form className="p-7">
        <h2 className="font-bold">시작 시간</h2>
        <input
          id="start"
          className="mb-4"
          ref={startRef}
          type="datetime-local"
          onChange={handleInput}
        />
        <h2 className="font-bold">종료 시간</h2>
        <input
          id="end"
          className="mb-4"
          ref={endRef}
          type="dateTime-local"
          onChange={handleInput}
        />
        <h2 className="mb-4 font-bold">제목</h2>
        <input
          type="text"
          id="title"
          onChange={handleInput}
          className="w-80 mb-4 p-3 border border-gray-400 rounded-lg"
        />
        <h2 className="mb-4 font-bold">장소</h2>
        <input
          type="text"
          id="location"
          onChange={handleInput}
          className="w-80 mb-4 p-3 border border-gray-400 rounded-lg"
        />
        <h2 className="mb-3 font-bold">설명</h2>
        <textarea
          id="description"
          className="resize-none w-80 h-40 mb-4 p-3 border border-gray-400 rounded-lg"
          onChange={handleInput}
        />
        <div className="flex flex-col items-center">
          <GoogleOAuthProvider clientId={clientId}>
            <CustomGoogleLogin />
          </GoogleOAuthProvider>
          <button
            type="submit"
            id="description"
            className="mt-4 p-3 text-white rounded-lg bg-blue-600 "
            onClick={(e) => {
              e.preventDefault();
              if (!inputRef.current.title) {
                alert("제목을 입력해주세요");
                return;
              }
              gapiPostEvent(apiKey, {
                calendarId: calendarId,
                resource: postEventFormat({
                  ...inputRef.current,
                  start: new Date(inputRef.current.start),
                  end: new Date(inputRef.current.end),
                }),
              });
            }}
          >
            token
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateSchedule;
