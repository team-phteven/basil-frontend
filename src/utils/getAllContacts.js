export const allContacts = (conversations, localUser) => {

    const users = conversations.reduce((prev, conversation) => {
        return [...prev, ...conversation.users]
    }, [])

    const filteredUsers = users.reduce((prev, user) => {
        if (user.email == localUser.email) return prev
        if (prev.includes(user)) return prev
        return [...prev, user]
    }, [])

    return filteredUsers

}
