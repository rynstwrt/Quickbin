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


    static async #getLastPostID()
    {
        const resp = await this.#makeQuery(`SELECT LAST_INSERT_ID()`);
        return resp[0]["LAST_INSERT_ID()"];
    }


    static async savePost(content, format)
    {
        const columns = "(Post_UUID, Content, Format)";
        const values = `(UUID(), '${content}', '${format}')`;
        const query = `INSERT INTO ${process.env.POSTS_TABLE} ${columns} VALUES ${values};`;

        await this.#makeQuery(query);

        const postID = await this.#getLastPostID();
        const targetPost = await this.#makeQuery(`SELECT * FROM ${process.env.POSTS_TABLE} WHERE Post_ID=${postID}`);

        return targetPost[0].Post_UUID;
    }


    static async getPostFromPostUUID(postUUID)
    {
        const post = await this.#makeQuery(`SELECT * FROM ${process.env.POSTS_TABLE} WHERE Post_UUID='${postUUID}'`);
        return post[0];
    }


    static async #getPostIDFromPostUUID(postUUID)
    {
        const targetPost = await this.#makeQuery(`SELECT * FROM ${process.env.POSTS_TABLE} WHERE Post_UUID='${postUUID}'`);
        return targetPost[0].Post_ID;
    }


    static overwritePost(postUUID, textContent, format)
    {
        return new Promise(async (res, rej) =>
        {
            console.log("resaving ", postUUID, textContent, format)

            const postID = await this.#getPostIDFromPostUUID(postUUID);
            const values = `('${postID}', '${postUUID}', '${textContent}', '${format}')`;
            const query = `REPLACE INTO ${process.env.POSTS_TABLE} VALUES ${values}`;

            const resp = await this.#makeQuery(query);
            res(resp);
        });
    }


    // TO ADD EXTERNAL IP TO WHITELIST
    // GRANT ALL ON quickbin_db.* TO ryn@'1.2.3.4' IDENTIFIED BY 'PASSWORD';
}