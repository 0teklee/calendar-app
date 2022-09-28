import { useEffect, useRef, useState } from "react";

import CreateSchedule from "components/Module/CreateSchedule";
import DetailSchedule from "components/Module/DetailSchedule";
import { IEventDetail, ISelectDate } from "libs/types/CalendarTypes";
import Calendar from "components/Module/Calendar";
import SelectModal from "components/Module/SelectModal";
import React from "react";

const Template = () => {
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [isDetailModal, setIsDetailModal] = useState(false);

  const [scheduleDetail, setScheduleDetail] = useState<IEventDetail>({
    title: "",
    description: "",
    start: null,
    end: null,
    location: "",
  });

  const [selectX, setSelectX] = useState<number | undefined>(undefined);

  const selectCreate = useRef<ISelectDate | undefined>(undefined);
  const createModalFlag = useRef(false);

  /* browser size에 따라 create 진입 모달 위치 변경 */
  const getWindowSize = () => {
    const { innerWidth } = window;
    return innerWidth;
  };
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener("resize", handleWindowSize);
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  useEffect(() => {
    if (createModalFlag.current) {
      setIsCreateModal(true);
      createModalFlag.current = false;
    }
  }, [createModalFlag.current]);

  return (
    <>
      <div className="Template">
        <h1 className="mt-20 mb-10 text-5xl font-semibold text-center">
          Calendar App
        </h1>
        <h2 className="mt-5 mb-5 text-xl font-semibold text-center">
          Developed by Tekwoo Lee (@0teklee)
        </h2>
        <div className="relative p-10">
          <Calendar
            setIsDetailModal={setIsDetailModal}
            setScheduleDetail={setScheduleDetail}
            selectCreate={selectCreate}
            setSelectX={setSelectX}
          />
          {selectX && selectX !== 0 ? (
            <SelectModal
              selectX={selectX}
              selectCreate={selectCreate.current}
              windowSize={windowSize}
              createModalFlag={createModalFlag}
            />
          ) : null}
        </div>
        {isCreateModal && selectCreate.current !== undefined && (
          <CreateSchedule
            start={selectCreate.current.start}
            end={selectCreate.current.end}
            setState={setIsCreateModal}
          />
        )}
        {isDetailModal && (
          <DetailSchedule props={scheduleDetail} setState={setIsDetailModal} />
        )}
      </div>
    </>
  );
};

export default React.memo(Template);
