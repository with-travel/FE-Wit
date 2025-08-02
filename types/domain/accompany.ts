interface Accompany {
  id: number;
  country: string;
  startDate: string;
  startTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
  title: string;
  maxParticipants: number;
  writer: string;
  views: number;
  createdAt: string;
}

export { Accompany };
