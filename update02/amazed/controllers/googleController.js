import passportGoogle from 'passport-google-oauth'
import config from '../config.js';
import User from '../model/userModel.js';

const GoogleStrategy = passportGoogle.OAuth2Strategy;

//Strategy for google
export const G_Strategy = new GoogleStrategy({
    clientID: config.google.GOOGLE_CLIENT_ID,
    clientSecret: config.google.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    proxy: true
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({email: profile.emails[0].value})
            .then((user) => {
                if(user) {
                    return done(null, user);
                }else {
                    let user = {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        imageUrl: profile.photos[0].value,
                        provider: profile.provider,
                        googleId: profile.id,
                    }

                    new User(user).save()
                        .then((user) => {
                            return done(null, user);
                        })
                }
        })
    }
);