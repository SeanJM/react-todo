export interface InputBaseEvent {
  type: string;
}

export interface InputValueEvent extends InputBaseEvent {
  value: any;
}