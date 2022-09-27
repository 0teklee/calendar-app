import { ViewApi } from "@fullcalendar/react";

interface IEventDetail {
  title: string;
  description?: string;
  start: Date | null;
  end: Date | null;
  location?: string;
}

interface ISelectDate {
  allDay?: boolean;
  end?: Date;
  start?: Date;
}

export type { IEventDetail, ISelectDate };
