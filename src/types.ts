export interface RSVP {
  id?: string;
  guestName: string;
  email?: string;
  attending: boolean;
  adultsCount: number;
  kidsCount: number;
  dietary?: string;
  specialNote?: string;
  submittedAt?: string;
}

export interface Wish {
  id: string;
  author: string;
  message: string;
  avatarIcon?: string;
  createdAt: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface EventDetails {
  daughterName: string;
  daughterAge: number;
  husbandName: string;
  husbandAge: number;
  dateStr: string;
  formattedDate: string;
  timeRange: string;
  startTime: string;
  endTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  colors: {
    pink: string;
    blue: string;
    purple: string;
    gold: string;
  };
}
