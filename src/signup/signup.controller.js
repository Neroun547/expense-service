const { createHash } = require("crypto");

class SignupController {
    constructor(usersServiceDb) {
        this.usersServiceDb = usersServiceDb;
    }

    async signup(body, res) {
        const usersInDb = await this.usersServiceDb.getUsersByUsername(body.username);

        if(usersInDb.length) {
            res.writeHead(400);
            res.end(JSON.stringify({ message: "User with this username already exists" }));
        } else {
            const hash = createHash("sha512");

            hash.update(body.password, "utf-8");

            await this.usersServiceDb.createUser(body.username, hash.digest("hex"));

            res.writeHead(201);
            res.end(JSON.stringify({ message: "User created" }));
        }
    }
}

module.exports = { SignupController };
