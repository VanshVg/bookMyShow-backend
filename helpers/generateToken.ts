import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const generateToken = (
  first_name: string,
  last_name: string,
  email_id: string,
  contact_no: string,
  role: "admin" | "user" | "organizer"
) => {
  return jwt.sign(
    {
      data: {
        firstName: first_name,
        lastName: last_name,
        email: email_id,
        contactNo: contact_no,
        role: role,
      },
    },
    process.env.SECRET_KEY as string
  );
};
