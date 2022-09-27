interface IEventDetail {
  title: string;
  description?: string;
  allDay?: boolean;
  start: Date | null;
  end: Date | null;
  location?: string;
}

export default IEventDetail;
