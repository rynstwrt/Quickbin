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
    })
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
function createUser(email, firstName, lastName, username, password)
{
    console.log(`Creating user with username ${username}.`);

    const columns = "(Email, FirstName, LastName, Username, Password)";
    const values = `('${email}', '${firstName}', '${lastName}', '${username}', '${password}')`;
    const query = `INSERT INTO ${process.env.USERS_TABLE} ${columns} VALUES ${values};`;

    makeQuery(query).then(() =>
    {
        console.log("Closing connection.");
        connection.end();
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

// deleteUser(3);
// createUser("a", "first", "last", "woofy", "test");
// showEntries();
showColumns();