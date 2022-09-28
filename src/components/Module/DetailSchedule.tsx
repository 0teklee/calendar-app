import Modal from "@components/Atom/Modal";
import { IEventDetail } from "libs/types/CalendarTypes";
import { Dispatch } from "react";

const DetailSchedule = ({
  props,
  setState,
}: {
  props: IEventDetail;
  setState: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { title, description = "설명 없음", start, end, location } = props;

  return (
    <Modal setState={setState}>
      <div className="p-12">
        <div className="w-80 mb-4">
          <h1 className="inline mr-5 font-bold">제목 :</h1>
          <span>{title}</span>
        </div>
        <div className="w-80 mb-4">
          <h1 className="inline mr-5 font-bold">시작 :</h1>
          <span>
            {start?.toLocaleString("ko-KR", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="w-80 mb-4">
          <h1 className="inline mr-5 font-bold">종료 :</h1>
          <span>
            {end?.toLocaleString("ko-KR", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="w-80 mb-4">
          <h2 className="inline mr-5 font-bold">장소 :</h2>
          <span>{location ? location : "장소 없음"}</span>
        </div>

        <div className="w-80 mb-4">
          <h2 className="mb-4 font-bold">설명 :</h2>
          <p>{description}</p>
        </div>
      </div>
    </Modal>
  );
};

export default DetailSchedule;
