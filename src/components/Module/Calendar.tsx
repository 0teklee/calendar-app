import React from "react";
import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactonPlugin from "@fullcalendar/interaction";

import { ICalendarProps } from "libs/types/CalendarTypes";

const Calendar = ({
  setScheduleDetail,
  setIsDetailModal,
  setSelectX,
  selectCreate,
}: ICalendarProps) => {
  const apiKey = process.env.REACT_APP_G_API_KEY;
  const calendarID = process.env.REACT_APP_CALENDAR_ID;

  return (
    <>
      <FullCalendar
        plugins={[googleCalendarPlugin, timeGridPlugin, interactonPlugin]}
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
        selectable
        selectMirror
        select={(e) => {
          setSelectX(e.jsEvent?.screenX);
          selectCreate.current = {
            start: e.start,
            end: e.end,
          };
        }}
        unselect={() => {
          setTimeout(() => {
            setSelectX(0);
          }, 10);
        }}
      />
    </>
  );
};

export default React.memo(Calendar);
