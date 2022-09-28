import { ISelectDate } from "libs/types/CalendarTypes";
import { MutableRefObject } from "react";

const SelectModal = ({
  windowSize,
  selectX,
  selectCreate,
  createModalFlag,
}: {
  windowSize: number;
  selectX: number;
  selectCreate?: ISelectDate;
  createModalFlag: MutableRefObject<boolean>;
}) => {
  return selectCreate !== undefined ? (
    <div
      className={`absolute top-1/3 ${
        windowSize / 2 > selectX ? "left-2/3" : "right-2/3"
      } p-8 bg-gray-700 bg-opacity-80 z-50 text-white rounded`}
    >
      <p className="mb-4 font-bold">
        {selectCreate.start.toLocaleString("ko-KR", {
          month: "short",
          day: "2-digit",
        })}
        {selectCreate.start.toLocaleDateString() ===
        selectCreate.end?.toLocaleDateString()
          ? null
          : ` ~ ${selectCreate.end?.toLocaleString("ko-KR", {
              month: "short",
              day: "2-digit",
            })}`}
      </p>
      <p className="mb-8 font-bold">
        {selectCreate.start.toLocaleString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        ~{" "}
        {selectCreate.end?.toLocaleString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <button
        type="button"
        onClick={() => {
          createModalFlag.current = true;
        }}
        className="p-4 bg-blue-400 hover:bg-yellow-400 rounded-lg duration-500"
      >
        이벤트 추가하기
      </button>
    </div>
  ) : null;
};

export default SelectModal;
