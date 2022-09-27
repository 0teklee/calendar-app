import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";

import Loading from "@components/Module/Loading";
import CreateSchedule from "@components/Module/CreateSchedule";
import DetailSchedule from "@components/Module/DetailSchedule";
import { IEventDetail, ISelectDate } from "libs/types/CalendarTypes";

function App() {
  const apiKey = process.env.REACT_APP_G_API_KEY;
  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const [loader, setLoader] = useState(false);

  const [isCreateModal, setIsCreateModal] = useState(true);
  const [isDetailModal, setIsDetailModal] = useState(false);

  const [scheduleDetail, setScheduleDetail] = useState<IEventDetail>({
    title: "",
    description: "",
    start: null,
    end: null,
    location: "",
  });

  const [selectX, setSelectX] = useState<number | undefined>(0);

  const [selectCreate, setSelectCreate] = useState<ISelectDate | undefined>(
    undefined
  );

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

  return (
    <>
      <div className="App">
        <h1 className="mt-20 mb-10 text-5xl font-semibold text-center">
          Calendar App
        </h1>
        <h2 className="mt-5 mb-5 text-xl font-semibold text-center">
          Developed by Tekwoo Lee (@0teklee)
        </h2>
        <div className="relative p-10">
          <FullCalendar
            plugins={[googleCalendarPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            googleCalendarApiKey={apiKey}
            events={{
              googleCalendarId: calendarID,
            }}
            eventDisplay="block"
            eventTextColor="#000"
            eventColor="#f2921d"
            eventClick={(e) => {
              e.jsEvent.preventDefault();
              setScheduleDetail({
                title: e.event._def.title,
                description: e.event._def.extendedProps?.description,
                start: e.event.start,
                end: e.event.end,
                location: e.event._def.extendedProps?.location,
              });
              setIsDetailModal(true);
            }}
            editable
            selectable
            select={(e) => {
              setSelectX(e.jsEvent?.screenX);
              setSelectCreate({
                allDay: e.allDay,
                start: e.start,
                end: e.end,
              });
            }}
            selectMirror
            unselect={() => {
              setSelectX(0);
              setSelectCreate(undefined);
            }}
          />
          {selectX && selectCreate?.start && (
            <div
              className={`absolute top-56 ${
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
              <button className="p-4 bg-blue-400 hover:bg-yellow-400 rounded-lg duration-500">
                이벤트 추가하기
              </button>
            </div>
          )}
        </div>
        {loader && <Loading />}
        {isCreateModal && <CreateSchedule setState={setIsCreateModal} />}
        {isDetailModal && (
          <DetailSchedule props={scheduleDetail} setState={setIsDetailModal} />
        )}
      </div>
    </>
  );
}

export default App;
