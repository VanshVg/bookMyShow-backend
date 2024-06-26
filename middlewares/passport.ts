import { Request } from "express";
import { Strategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { config } from "dotenv";
import passport from "passport";
import { JwtPayload } from "jsonwebtoken";
import { Op } from "sequelize";

import User from "../database/models/User";
import db from "../config/dbConnect";

config();
const userModel = db.User;

const cookieExtractor = (req: Request): string => {
  let token: string = "";
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

export const applyPassportStrategy = () => {
  try {
    let jwt = cookieExtractor;

    const options: StrategyOptions = {
      jwtFromRequest: jwt,
      secretOrKey: process.env.SECRET_KEY as string,
    };

    passport.use(
      new Strategy(options, async (jwt_payload: JwtPayload, done: VerifiedCallback) => {
        const isUser: User | null = await userModel.findOne({
          where: {
            [Op.and]: [{ email_id: jwt_payload.data.email }, { deletedAt: { [Op.not]: null } }],
          },
        });
        if (isUser === null) {
          return done(null, false);
        }
        return done(null, isUser.dataValues);
      })
    );
  } catch (error) {
    return null;
  }
};
