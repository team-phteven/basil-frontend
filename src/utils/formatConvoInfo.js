const formatConvoInfo = (users, billableSeconds) => {
    let formattedArray = [];
    for (let id in billableSeconds) {
        users.forEach((user) => {
            if (user._id == id) {
                formattedArray.push({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    seconds: billableSeconds[id],
                });
            }
        });
    }
    return formattedArray;
};

module.exports = {
    formatConvoInfo,
};
