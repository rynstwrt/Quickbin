const mysql = require("mysql");
require("dotenv").config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


module.exports = class DBManager
{
    static #makeQuery(query)
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


    static showEntries()
    {
        console.log("USERS TABLE ENTRIES:");

        this.#makeQuery(`SELECT * FROM ${process.env.USERS_TABLE}`).then(response =>
        {
            console.log(response);
        });
    }


    static showColumns()
    {
        console.log("USERS TABLE COLUMNS:");

        this.#makeQuery(`SHOW COLUMNS FROM ${process.env.USERS_TABLE}`).then(response =>
        {
            console.log(response);
        });
    }


    // UserID, Email, FirstName, LastName, Username, Password
    static createUser(email, username, password)
    {
        console.log(`Creating user with username ${username}.`);

        const columns = "(Email, Username, Password)";
        const values = `('${email}', '${username}', '${password}')`;
        const query = `INSERT INTO ${process.env.USERS_TABLE} ${columns} VALUES ${values};`;

        this.#makeQuery(query).then(() =>
        {
            console.log(`Created user ${username}!`);
        });
    }


    static deleteUser(userID)
    {
        console.log(`Deleting user #${userID}...`);

        this.#makeQuery(`DELETE FROM users WHERE UserID=${userID}`).then(() =>
        {
            console.log(`Deleted user #${userID}!`);
        });
    }


    static #findUserByEmail(email)
    {
        return new Promise((res, rej) =>
        {
            const query = `SELECT * FROM ${process.env.USERS_TABLE} WHERE Email='${email}'`;

            this.#makeQuery(query).then(response =>
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


    static isEmailAndUsernameAvailable(email, username)
    {
        return new Promise((res, rej) =>
        {
            const query = `SELECT * FROM ${process.env.USERS_TABLE} WHERE Email='${email}' OR Username='${username}'`;

            this.#makeQuery(query).then(response =>
            {
                const available = {
                    email: true,
                    username: true
                };

                for (const user of response)
                {
                    if (user["Email"].toLowerCase() === email.toLowerCase())
                        available.email = false;

                    if (user.Username.toLowerCase() === username.toLowerCase())
                        available.username = false;
                }

                return res(available);
            });
        });
    }


    static getPasswordFromEmail(email)
    {
        const user = this.#findUserByEmail(email);
        return user["Password"];
    }
}