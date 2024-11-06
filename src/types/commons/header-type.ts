export interface Alarm {
  id: number;
  content: string;
  generatedDate: string;
  type: "UPDATE" | "EMERGENCY";
  isRead: boolean;
}

export interface AlarmList {
  alarms: Alarm[];
}
