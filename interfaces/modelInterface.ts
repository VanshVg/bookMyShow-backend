export interface modelInterface {
  User: usersAttributes;
}

export interface usersAttributes {
  id?: number;
  first_name: string;
  last_name: string;
  email_id: string;
  contact_no: string;
  password: string;
  is_active?: boolean;
  verification_token?: string;
  reset_token?: string;
  deletedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
