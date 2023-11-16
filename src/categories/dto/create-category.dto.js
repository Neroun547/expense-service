function createCategoryDto(name, createdAt) {
    if(typeof name !== "string" || typeof createdAt !== "string" || name.length < 1 || name.length > 50) {
        throw new Error(JSON.stringify({ status: 400, message: "Bad request" }));
    }
    return { name: name, createdAt: createdAt };
}

module.exports = { createCategoryDto };
