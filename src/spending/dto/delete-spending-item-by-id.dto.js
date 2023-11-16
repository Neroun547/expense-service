function deleteSpendingItemByIdDto(id) {
    if(typeof id !== "number") {
        throw new Error(JSON.stringify({ status: 400, message: "Id must be number" }));
    }

    return id;
}

module.exports = { deleteSpendingItemByIdDto };
