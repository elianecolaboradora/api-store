import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { compareHash, createHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { User } from "../models/users.model.js"

passport.use(
  "register",
  new LocalStrategy(

    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {

        const one = await User.findOne({ email });
      
        if (one) {
          const error = new Error("Bad Auth");
          error.statusCode = 401;
          throw error;
        }

        const hashPassword = createHash(password);
        req.body.password = hashPassword;

        const user = await User.create(req.body);

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use("login", new LocalStrategy(
  
  { usernameField: "email", passReqToCallback: true },

  async (req, email, password, done) => {
    try {

      const one = await User.findOne({ email })
    
      if (!one) {
        const error = new Error("Bad Auth")
        error.statusCode = 401;
        throw error;
      }
    
      const verify = compareHash(password, one.password)
    
      if (!verify) {
        const error = new Error("Bad Auth")
        error.statusCode = 401;
        throw error;
      }

      const token = createToken({ user_id: one._id, role: one.role })
    
      done(null, { ...one.toObject(), token });
      
    } catch (error) {
      done(error)
    }
  }
));

export default passport;
