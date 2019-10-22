//passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/user');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return UserModel.findOne({ username, password })
            .then(user => {
                console.log("user in then:", user);
                if (user.length === 0) {
                    console.log('Incorrect username or password.')
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                var bcrypt = require('bcryptjs');
                console.log(password);

                const isCorrectPassword = bcrypt.compareSync(password, user[0].password);
                console.log(isCorrectPassword);
                if (!isCorrectPassword) {
                    console.log('Incorrect username or password.')
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                const { id, username } = user[0];

                console.log('Logged In Successfully.')
                return cb(null, { id, username }, { message: 'Logged In Successfully.' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {
        console.log("passport.js:: jwtPayload: ", jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOne({ username: jwtPayload.username })
            .then(user => {
                return cb(null, user[0]);
            })
            .catch(err => {
                return cb(err);
            });
    }
));