import React, { Dispatch, useEffect, useRef, useState } from "react";
import Cookie from "js-cookie";

import Modal from "components/Atom/Modal";
import CustomGoogleLogin from "components/Module/CustomGoogleLogin";
import { GoogleOAuthProvider } from "@react-oauth/google";

import postEventFormat from "libs/postEventFormat";
import { ICreateProps } from "libs/types/CalendarTypes";
import { apiKey, calendarId, clientId } from "libs/apiConfig";
import gapiCreateEvent from "libs/gapiCreateEvent";

const CreateSchedule = ({
  setState,
  start,
  end,
}: {
  setState: Dispatch<React.SetStateAction<boolean>>;
  start: Date;
  end: Date;
}) => {
  const [isCookie, setIsCookie] = useState<boolean>(
    Cookie.get("access_token") !== undefined
  );

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
          className="resize-none w-80 h-40 mb-4 p-3 border border-gray-400 rounded-lg "
          onChange={handleInput}
        />
        <div className="flex flex-col items-center">
          {!isCookie && (
            <GoogleOAuthProvider clientId={clientId}>
              <CustomGoogleLogin setState={setIsCookie} />
            </GoogleOAuthProvider>
          )}

          <button
            type="submit"
            id="description"
            className={`mt-4 p-3 text-white rounded-lg bg-blue-${
              isCookie ? 600 : 200
            }`}
            onClick={async (e) => {
              e.preventDefault();
              if (!isCookie) {
                alert("로그인을 진행해주세요");
                return;
              }
              if (!inputRef.current.title) {
                alert("제목을 입력해주세요");
                return;
              }
              const post = await gapiCreateEvent(apiKey, {
                calendarId: calendarId,
                resource: postEventFormat({
                  ...inputRef.current,
                  start: new Date(inputRef.current.start),
                  end: new Date(inputRef.current.end),
                }),
              });
              if (post) {
                alert("달력에 일정을 추가했습니다.");
              }
              if (!post) {
                alert("에러 발생. 일정을 추가하지 못했습니다.");
              }
              window.location.reload();
            }}
          >
            일정 추가
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateSchedule;
