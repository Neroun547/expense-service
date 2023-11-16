const { createHash } = require("crypto");
const { sign, verify } = require("jsonwebtoken");
const { jwt_exp, jwt_secret } = require("../../config.json");

class AuthController {
    constructor(usersServiceDb) {
        this.usersServiceDb = usersServiceDb;
    }

    async auth(body, res) {
        const usersInDb = await this.usersServiceDb.getUsersByUsername(body.username);

        if(!usersInDb.length) {
            res.writeHead(404);
            res.end(JSON.stringify({ message: "User with this username not found" }));

            return;
        }
        const hash = createHash("sha512");

        hash.update(body.password, "utf-8");

        if(hash.digest("hex") === usersInDb[0].password) {
            const token = sign({ id: usersInDb[0].id, username: usersInDb[0].username }, jwt_secret, { expiresIn: jwt_exp });

            res.writeHead(200);
            res.end(JSON.stringify({ token: token }));
        } else {
            res.writeHead(401);
            res.end(JSON.stringify({ message: "Wrong password" }));
        }
    }
    async checkToken(req, res) {
        try {
            const token = req.headers.authorization;

            await verify(token, jwt_secret);

            res.writeHead(200);
            res.end();
        } catch(e) {
            res.writeHead(403);
            res.end();
        }
    }
}

module.exports = { AuthController };
