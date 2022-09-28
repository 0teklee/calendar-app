interface IEventDetail {
  title: string;
  description?: string;
  location?: string;
  start: Date | null;
  end: Date | null;
}

interface ISelectDate {
  start: Date;
  end: Date;
}

interface IPostEventBody extends Omit<IEventDetail, "start" | "end"> {
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
}

interface ICreateProps extends Omit<IPostEventBody, "start" | "end"> {
  start: string;
  end: string;
}

interface IGapiInsert extends Omit<IPostEventBody, "start" | "end" | "title"> {
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}

export type {
  IEventDetail,
  ISelectDate,
  IPostEventBody,
  IGapiInsert,
  ICreateProps,
};
