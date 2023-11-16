function getSpendingByCategoryIdDto(categoryId, dateFrom, dateTo) {
    if(typeof categoryId !== "number") {
        throw new Error(JSON.stringify({ status: 400, message: "Category id must be a number" }));
    }
    if(typeof dateFrom !== "string") {
        throw new Error(JSON.stringify({ status: 400, message: "Date from must be a string" }));
    }
    if(typeof dateTo !== "string") {
        throw new Error(JSON.stringify({ status: 400, message: "Date to must be a string" }));
    }
    return { categoryId, dateFrom, dateTo };
}

module.exports = { getSpendingByCategoryIdDto };
