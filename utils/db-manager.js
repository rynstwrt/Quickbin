const mysql = require("mysql");
require("dotenv").config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


function makeQuery(query)
{
    return new Promise((res, rej) =>
    {
        connection.query(query, (err, result, field) =>
        {
            if (err) return rej(err);
            res(Object.values(JSON.parse(JSON.stringify(result))));
        });
    });
}


function showEntries()
{
    console.log("USERS TABLE ENTRIES:");

    makeQuery(`SELECT * FROM ${process.env.USERS_TABLE}`).then(response =>
    {
        console.log(response);
    });
}


function showColumns()
{
    console.log("USERS TABLE COLUMNS:");

    makeQuery(`SHOW COLUMNS FROM ${process.env.USERS_TABLE}`).then(response =>
    {
        console.log(response);
    });
}


// UserID, Email, FirstName, LastName, Username, Password
function createUser(email, username, password)
{
    console.log(`Creating user with username ${username}.`);

    const columns = "(Email, Username, Password)";
    const values = `('${email}', '${username}', '${password}')`;
    const query = `INSERT INTO ${process.env.USERS_TABLE} ${columns} VALUES ${values};`;

    makeQuery(query).then(() =>
    {
        console.log("Closing connection.");
    });
}


function deleteUser(userID)
{
    console.log(`Deleting user #${userID}...`);

    makeQuery(`DELETE FROM users WHERE UserID=${userID}`).then(() =>
    {
        console.log(`Deleted user #${userID}!`);
    });
}


function findUserByEmail(email)
{
    return new Promise((res, rej) =>
    {
        const query = `SELECT * FROM ${process.env.USERS_TABLE} WHERE Email='${email}'`;

        makeQuery(query).then(response =>
        {
            if (response)
            {
                const user = response[0];
                return res(user);
            }

            return rej();
        });
    });
}


function isEmailAndUsernameAvailable(email, username)
{
    return new Promise((res, rej) =>
    {
        const query = `SELECT * FROM ${process.env.USERS_TABLE} WHERE Email='${email}' OR Username='${username}'`;

        makeQuery(query).then(response =>
        {
            return (response.length > 0) ? res(false) : res(true);
        });
    });
}


function getPasswordFromEmail(email)
{
    const user = findUserByEmail(email);
    return user["Password"];
}


module.exports = {
    showEntries: showEntries,
    findUserByEmail: findUserByEmail,
    getPasswordFromEmail: getPasswordFromEmail,
    createUser: createUser,
    isEmailAndUsernameAvailable: isEmailAndUsernameAvailable
    // deleteAllUsersFromDB: deleteAllUsersFromDB,
    // endDBConnection: endDBConnection
};


/*
    INSERT INTO users IF NOT EXIST (Email, FirstName, LastName, Username, Password) VALUES ('woofyryn@gmail.com', 'Ryn', 'Stewart', 'Ryn', 'toor');
 */