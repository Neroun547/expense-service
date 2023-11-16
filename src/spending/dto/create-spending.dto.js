function createSpendingDto(categoryId, value, date, description) {
    if(typeof categoryId !== "number") {
        throw new Error(JSON.stringify({ status: 400, message: "Category id must be a number" }));
    }
    if(typeof value !== "number") {
        throw new Error(JSON.stringify({ status: 400, message: "Value must be a number" }));
    }
    if(typeof date !== "string") {
        throw new Error(JSON.stringify({ status: 400, message: "Date must be string" }));
    }
    if(typeof description !== "string" || description.length > 255) {
        throw new Error(JSON.stringify({ status: 400, message: "Description must be string and must have from 1 to 255 symbols" }));
    }
    return { categoryId: categoryId, value: value, date: date, description: description };
}

module.exports = { createSpendingDto };
