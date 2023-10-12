const mysql = require("mysql");
require("dotenv").config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: "utf8mb4"
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


    // TO ADD EXTERNAL IP TO WHITELIST
    // GRANT ALL ON quickbin_db.* TO ryn@'1.2.3.4' IDENTIFIED BY 'PASSWORD';
}