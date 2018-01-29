var bcrypt = require('bcrypt');

const passwords = {

    // Simple password database for now.
    // Used saltRounds = 10 and bcrypt.hashSync() to generate test password
    // TODO: Replace with database lookup
    userdb : [
        { "id":"jcaple", "email":"fakenews@yahoo.com", "password":"$2a$10$Z1ksw.74b/OGXFTOjEuMWeopL4SLsPB22EDaDxdYWyYr2iDS97zPa" }
    ],

    /**
     * Compare password hashes to see if they match.
     */
    checkPasswd:function(userid, passwdTest) {
        const userPasswdHash = passwords.getPasswdHashFromUserId(userid);
        return bcrypt.compareSync(passwdTest, userPasswdHash);
    },

    /**
     * Hash a password string given a salt value.
     */
    hashPassword:function(password, salt) {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    /**
     * Look up a password hash by userid.
     */
    getPasswdHashFromUserId:function(userid) {
        let hash = "";
        for(let i=0;i<passwords.userdb.length;i++) {
            pass = passwords.userdb[i];
            if (pass.id === userid) 
                hash = pass.password;
        }
        return hash;
    }
};

module.exports = passwords;