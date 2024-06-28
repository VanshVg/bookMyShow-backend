export interface BasicModelInterface {
  id: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersAttributes extends BasicModelInterface {
  first_name: string;
  last_name: string;
  email_id: string;
  contact_no: string;
  password: string;
  is_active: boolean;
  verification_token: string;
  reset_token: string;
  reset_time: Date | null;
  role: "admin" | "user" | "organizer";
}

export interface EventAttributes extends BasicModelInterface {
  name: string;
  description: string;
  address: string;
  start_time: Date;
  end_time: Date;
}

export interface UserEventAttributes {
  id: number;
  organizer_id: number;
  event_id: number;
}

export interface EventTypesAttributes extends BasicModelInterface {
  type: string;
}

export interface EventSectionAttributes extends BasicModelInterface {
  name: string;
  event_id: number;
  price: number;
}

export interface MoviesAttributes extends BasicModelInterface {
  name: string;
  description: string;
  run_time: string;
  release_date: Date;
}

export interface TheatresAttributes extends BasicModelInterface {
  name: string;
  owner_id: string;
  address: string;
  screens: number;
}

export interface TheatreMoviesAttributes {
  id: number;
  theatre_id: number;
  movie_id: number;
}

export interface ScreensAttributes extends BasicModelInterface {
  name: string;
  theatre_id: number;
  seats: number;
}

export interface ShowsAttributes extends BasicModelInterface {
  screen_id: number;
  movie_id: number;
  start_time: Date;
  end_time: Date;
}

export interface SeatsAttributes extends BasicModelInterface {
  show_id: number;
  seat_no: string;
  price: number;
}

export interface BookingAttributes extends BasicModelInterface {
  user_id: number;
  show_or_event_id: number;
  show_or_event: string;
}
