const { pool } = require('./DBConfig');
const saltRounds = 10;
const bcrypt = require("bcrypt");

const insertClient =  (body, callback) => {
    const { name, userName, email, profilePicture } = body;
    const { phone, passward, foundedDate, location } = body;

    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    let currentDate = year + "-" + month + "-" + date;

    //console.log(year + "-" + month + "-" + date);

    const query = "insert into "
    + "bryte.client ("
    + "CLI_Name, " 
    + "CLI_User_Name,"  
    + "CLI_Email, "
    + "CLI_Profile_Picture," 
    + "CLI_Phone," 
    + "CLI_Creation_Date," 
    + "CLI_Founded_Date," 
    + "CLI_Last_Login," 
    + "CLI_Hash,"  
    + "CLI_Location) "
    + " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

    bcrypt.genSalt(saltRounds, (salt_err, salt) => {

        bcrypt.hash(passward, salt, (hash_err, hash) => {
            pool.query(query, [name, userName, email, profilePicture,
                phone, currentDate, foundedDate, currentDate,
                hash, location], (sql_err, sql_res) => {
                    if (sql_err){
                        console.log(sql_err);
                        return callback({error : sql_err});
                    }

                    else{
                        return callback({sql_res : sql_res.insertId});
                    }
                    
                });
        });
    });

}

    module.exports = {
        insertClient
    }