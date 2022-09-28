import { IGapiInsert, IPostEventBody } from "libs/types/CalendarTypes";

const postEventFormat = (body: IPostEventBody): IGapiInsert => {
  const { title, location, description, start, end } = body;

  const reqBody = {
    summary: title,
    location: location,
    description: description,
    start: { dateTime: start.toISOString(), timeZone: "Asia/Seoul" },
    end: { dateTime: end.toISOString(), timeZone: "Asia/Seoul" },
  };
  return reqBody;
};

export default postEventFormat;
