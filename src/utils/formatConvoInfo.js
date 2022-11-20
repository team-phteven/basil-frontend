
export default function formatConvoInfo(users, billableSeconds, messages) {
    let formattedArray = [];
    for (let id in billableSeconds) {
        users.forEach((user) => {
            if (user._id == id) {
                formattedArray.push({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    seconds: billableSeconds[id],
                    messages: 0,
                });
            }
        });
    }

    formattedArray = formattedArray.map((user) => {
        let newUser = { ...user };
        messages.forEach((message) => {
            if (message.sender._id == user._id) {
                newUser = { ...newUser, messages: newUser.messages + 1 };
            }
        });
        return newUser;
    });

    return formattedArray;
};
