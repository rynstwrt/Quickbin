const mysql = require("mysql");
require("dotenv").config();
const bcrypt = require("bcrypt");


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
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


async function encryptPassword(password)
{
    return new Promise((res, rej) =>
    {
        bcrypt.genSalt(10, (err, salt) =>
        {
            if (err)
            {
                console.error(err);
                rej(err);
            }

            bcrypt.hash(password, salt, (err, hash) =>
            {
                if (err)
                {
                    console.error(err);
                    rej(err);
                }

                res(hash);
            });
        });
    });
}


function comparePassword(plainPassword, hashPassword)
{
    return new Promise((res, rej) =>
    {
        bcrypt.compare(plainPassword, hashPassword, (err, isMatch) =>
        {
            if (err)
            {
                console.error(err);
                rej(err)
                return;
            }

            res(isMatch);
        });
    });
}


async function getLastPostID()
{
    const resp = await makeQuery(`SELECT LAST_INSERT_ID()`);
    return resp[0]["LAST_INSERT_ID()"];
}


module.exports = class DBManager
{

    static async savePost(content, format, authorUUID = undefined)
    {
        const columns = authorUUID ? "(Post_UUID, Author_UUID, Content, Format)" : "(Post_UUID, Content, Format)";
        const values = authorUUID ? `(UUID(), '${authorUUID}', '${content}', '${format}')` : `(UUID(), '${content}', '${format}')`;
        const query = `INSERT INTO ${process.env.POSTS_TABLE} ${columns} VALUES ${values};`;

        await makeQuery(query);

        const postID = await getLastPostID();
        const targetPost = await makeQuery(`SELECT * FROM ${process.env.POSTS_TABLE} WHERE Post_ID=${postID}`);

        return targetPost[0].Post_UUID;
    }


    static async overwritePost(newContent, newFormat, postUUID)
    {
        const query = `UPDATE ${process.env.POSTS_TABLE} SET Content='${newContent}', Format='${newFormat}' WHERE Post_UUID='${postUUID}'`;
        await makeQuery(query);
    }


    static async getPostFromPostUUID(postUUID)
    {
        const post = await makeQuery(`SELECT * FROM ${process.env.POSTS_TABLE} WHERE Post_UUID='${postUUID}'`);
        return post[0];
    }


    static async register(username, password)
    {
        const columns = "(User_UUID, Username, Password)";
        const values = `(UUID(), '${username.toLowerCase()}', '${await encryptPassword(password)}')`;
        const query = `INSERT INTO ${process.env.USERS_TABLE} ${columns} VALUES ${values};`;

        await makeQuery(query);
    }


    static async getUserFromUsername(username)
    {
        const resp = await makeQuery(`SELECT * FROM ${process.env.USERS_TABLE} WHERE Username='${username}'`);
        return resp[0] || null;
    }


    static async authenticate(username, password)
    {
        const user = await this.getUserFromUsername(username);
        if (!user) return false;

        const valid = await comparePassword(password, user.Password);
        return valid ? user : false;
    }


    // static async getUserFromUsername(username)
    // {
    //     const user = await makeQuery(`SELECT * FROM ${process.env.USERS_TABLE} WHERE Username='${username.toLowerCase()}'`)
    //     return user[0];
    // }


    // TO ADD EXTERNAL IP TO WHITELIST
    // GRANT ALL ON quickbin_db.* TO ryn@'1.2.3.4' IDENTIFIED BY 'PASSWORD';

    // TO CLEAR ALL ROWS
    // TRUNCATE posts
}