import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import timeGridPlugin from "@fullcalendar/timegrid";

import Loading from "./components/Module/Loading";

function App() {
  const apiKey = process.env.REACT_APP_G_API_KEY;
  const calendarID = process.env.REACT_APP_CALENDAR_ID;
  const [loader, setLoader] = useState(false);

  const loadingCallback = (isLoading: boolean) => {
    if (isLoading) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  };

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
          />
        </div>
        {/* {loader && <Loading />} */}
      </div>
    </>
  );
}

export default App;
