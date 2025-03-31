import  passport from "./passport.mid.js";

export function passportCallback(strategy) {
    return async function (req, res, next) {
        return passport.authenticate(strategy,{ session: false }, (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).json({ 
                        success: false, 
                        message: info?.message || "Bad Auth" 
                    });
                }
                req.user = user;
                next();
            } catch (error) {
                next(error);
            }
        })(req, res, next);
    };
}