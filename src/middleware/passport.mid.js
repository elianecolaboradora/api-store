import passport from "passport";
import crypto from "crypto"
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from "passport-local";
import { verifyAccount } from "../utils/verifyAccount.util.js"
import { compareHash, createHash } from "../utils/hash.util.js";
import { usersManager } from "../dao/dao.js";
import { UserDto } from "../dto/users.dto.js";
import { envpath } from "../utils/env.utils.js";
import { createToken } from "../utils/token.util.js";

process.loadEnvFile(envpath)

passport.use(
    "register",
    new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: "email"
        },
        async (req, email, password, done) => {
            try {
                const one = await usersManager.readBy({ email });
                if (one) done(null, false, { message: "Email already in use" });

                const hashPassword = createHash(password);
                req.body.password = hashPassword;

                const verifyCode = crypto.randomBytes(12).toString('hex');
                req.body.verifyCode = verifyCode;

                const user = await usersManager.create(new UserDto(req.body));
                await verifyAccount({ to: email, verifyCode })
                done(null, user)
            } catch (error) {
                done(null, false, { message: error.message });
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await usersManager.readBy({ email });
                if (!user) return done(null, false, { message: "Invalid credentials" });

                const verifyPassword = compareHash(password, user.password);
                if (!user.verify) return done(null, false, { message: "verify your token", statusCode: 401 });

                if (!verifyPassword) {
                    return done(null, null, { message: "Incorrect password ", statusCode: 403 });
                }

                const token = createToken({
                    email: user.email,
                    role: user.role,
                    user_id: user._id
                })

                return done(null, { user, token });

            } catch (error) {
                done(null, false, { message: error.message });
            }
        }
    )
);

passport.use("google", new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/auth/google/callback",
        passReqToCallback: true,
        scope: ["email", "profile"]
    },
    async (req, accesToken, refreshToken, profile, done) => {
        try {
            let user = await usersManager.readBy({
                email: profile.id
            })
            if (!user) {
                user = {
                    email: profile.id,
                    name: profile.name.givenName,
                    avatar: profile.photos[0].value,
                    password: createHash(profile.id),
                };
                user = await usersManager.create(user);
            }
            const token = createToken({ email: user.email, role: user.role, user_id: user._id })
            // **Asignamos correctamente los datos en `req.user`**
            req.user = { user, token };
            done(null, user);
        } catch (error) {
            done(error)
        }
    }
))
passport.use(
    "jwt-auth",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([req => req?.cookies?.token]),
            secretOrKey: process.env.JWT_KEY
        },
        async (data, done) => {
            try {
                const { user_id } = data;
                const user = await usersManager.readById(user_id);
                if (!user) done(null, false);
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use("jwt-adm", new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
    },
    async (data, done) => {
        try {
            const { user_id, role } = data
            const user = await usersManager.findById(user_id)
            if (user.role !== "ADMIN") done(null)
            done(null, user)
        } catch (error) {
            done(error)
        }
    }
))


export default passport;
