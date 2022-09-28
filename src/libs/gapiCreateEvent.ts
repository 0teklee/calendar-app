import { IGapiInsert } from "libs/types/CalendarTypes";
import Cookie from "js-cookie";

const gapiCreateEvent = async (
  apiKey: string,
  sendEvent: { calendarId: string; resource: IGapiInsert }
) => {
  const { gapi } = window;
  const token = Cookie.get("access_token");
  if (token) {
    gapi.client.setToken({ access_token: token });
  }

  const request = await gapi.client.calendar.events.insert(sendEvent);
  if (request.status === 200) {
    return true;
  } else {
    return false;
  }
};

export default gapiCreateEvent;
