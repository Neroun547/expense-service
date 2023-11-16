function signupDto(username, password) {
    if(typeof username !== "string" || username.length < 3) {
        throw new Error(JSON.stringify({ status: 400, message: "Username must be greater or equal 3 symbols" }));
    }
    if(typeof password !== "string" || password.length < 6) {
        throw new Error(JSON.stringify({ status: 400, message: "Password must be greater or equal 6 symbols" }));
    }
    return { username, password };
}

module.exports = { signupDto };
