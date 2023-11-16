function deleteCategoryDto(id) {
    if(typeof id !== "number") {
        throw new Error(JSON.stringify({ status: 400, message: "id must be a number" }));
    }
    return id;
}

module.exports = { deleteCategoryDto };
