function newCategoryNameDto(name) {
    if(typeof name !== "string" || name.length < 1 || name.length > 50) {
        throw new Error(JSON.stringify({ status: 400, message: "Category name must be string from 1 symbol to 50 symbols" }));
    }

    return name;
}

module.exports = { newCategoryNameDto };
