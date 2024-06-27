export interface modelInterface {
  User: usersAttributes;
}

export interface usersAttributes {
  id: number;
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
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface eventAttributes {
  id: number;
  name: string;
  description: string;
  address: string;
  start_time: Date;
  end_time: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface userEventAttributes {
  id: number;
  organizer_id: number;
  event_id: number;
}

export interface eventTypesAttributes {
  id: number;
  type: string;
}
