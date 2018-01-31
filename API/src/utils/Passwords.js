const bcrypt = require('bcrypt');
const pg = require('pg');
const client = new pg.Pool();

const passwords = {

    /**
     * Compare password hashes to see if they match.
     */
    checkPasswd:function(userid, passwdTest, cb) {
        console.log('Checking password for: ' + userid + ' ' + passwdTest);
        passwords.getPasswdHashFromUserId(userid, function(userPasswdHash) {
            console.log('Response->' + userPasswdHash + ':');
            match = false;
            if(userPasswdHash) {
                match = bcrypt.compareSync(passwdTest, userPasswdHash);
                console.log('Do Passwords Match? ' + match);
            }
            cb(match);
        }); 
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
    getPasswdHashFromUserId:function(userid, cb) {
        client.connect((err, client, done) => {
            if(err) {
                console.log(err);
                done();
                cb(null);
            }

            // Insert User Account Data
            client.query('SELECT password_hash from g28formusers where user_id = $1',
                [userid], (ex, result) => {

                done();

                if (ex) {
                    console.log('**Error -> ' + JSON.stringify(ex));
                    cb(null);
                } else {
                    console.log('Retreived Password for ' + userid + '-->' + JSON.stringify(result));
                    if (result.rows.length == 0) 
                        cb(null);
                    else
                        cb(result.rows[0].password_hash);
                } 
            });
        });

    }
};

module.exports = passwords;