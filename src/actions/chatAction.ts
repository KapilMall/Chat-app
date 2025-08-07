export const changeChats = (chatId: string, user: any, currentUser: any) => ({
    type: "CHANGE_CHATS",
    payload: {chatId, user, currentUser}
})

export const changeBlock = () => ({
    type: "CHANGE_BLOCK"
})