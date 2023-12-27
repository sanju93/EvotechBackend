import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/User.js";
import { config } from "dotenv";
config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secretKey,
    },
    async function (payload, done) {
      try {
        let user = await User.findById(payload.user._id);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log(err);
        return done(null, false);
      }
    }
  )
);

export default passport;
