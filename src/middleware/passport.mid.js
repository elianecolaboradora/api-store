import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { compareHash, createHash } from "../utils/hash.util.js";
import { cookieExtractor, createToken } from "../utils/token.util.js";
import { User } from "../models/users.model.js"
// process.loadEnvFile(".env")
process.loadEnvFile(".envexample")

passport.use(
    "register",
    new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const one = await User.findOne({ email });
                if (one) {
                    return done(null, false, { message: "Email already in use" });
                }

                const hashPassword = createHash(password);
                req.body.password = hashPassword;

                const user = await User.create(req.body);

                done(null, user);
            } catch (error) {
                done(null, false, { message: error.message });
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const one = await User.findOne({ email });

                if (!one) {
                    return done(null, false, { message: "Invalid credentials" });
                }

                const verify = compareHash(password, one.password);

                if (!verify) {
                    return done(null, false, { message: "Invalid credentials" });
                }

                const token = createToken({ user_id: one._id, role: one.role });
                done(null, { ...one.toObject(), token });
            } catch (error) {
                done(null, false, { message: error.message });
            }
        }
    )
);

passport.use(
    "jwt-auth",
    new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor, // Usa la cookie en lugar del header
            secretOrKey: process.env.JWT_KEY,
        },
        async (data, done) => {
            try {
                const { user_id } = data;
                const user = await User.findById(user_id);
                if (!user) {
                    return done(null, false);
                }
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);


export default passport;
